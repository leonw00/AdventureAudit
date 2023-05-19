const { dbConfig } = require('./db');

const transactionFields = "transaction.transaction_id, transaction.trip_id as trip_id, transaction.name, transaction.amount, category.name as category_name, category.colour as category_colour, category.icon as category_icon, DATE_FORMAT(transaction.transaction_date, '%b/%d/%Y') as transaction_date, DATE_FORMAT(transaction.transaction_date, '%H:%i:%s') as transaction_time, transaction.description,";
const payerField = `
  CONCAT("[",
    GROUP_CONCAT( 
      CONCAT(
        CONCAT("{'user_id': ", payer.user_id, ", "), 
        CONCAT("'name': '", user.name, "', "), 
        CONCAT("'payedForTransaction': ", payer.payedForTransaction, "}")
      )
      ORDER BY payer.payedForTransaction DESC, payer.user_id ASC
    ), "]"
  ) as payers`;
const joinTables = 'LEFT JOIN category on transaction.category_id = category.category_id\nLEFT JOIN payer on transaction.transaction_id = payer.transaction_id\nLEFT JOIN user on payer.user_id = user.user_id';
const order = 'ORDER BY transaction.transaction_date DESC';

// Retrive a list transactions based on it's trip id
async function getTripTransaction(tripID) {
  const pool = await dbConfig();
  const statement = `SELECT ${transactionFields} ${payerField} from transaction ${joinTables} WHERE transaction.trip_id = ? GROUP BY transaction.transaction_id ${order}`;
  const [result] = await pool.promise().query(statement, [tripID]);
  for (let i = 0; i < result.length; i += 1) {
    result[i].payers = JSON.parse(result[i].payers.replace(/'/g, '"'));
  }
  return result;
}

// Adds a transaction to the transaction table
async function createTransaction(tripID, name, amount, categoryID, transactionDate, note, userID) {
  const pool = await dbConfig();
  const statement = 'INSERT INTO transaction (trip_id, name, amount, category_id, transaction_date, description) VALUES (?, ?, ?, ?, ?, ?);';
  const [result] = await pool.promise().query(statement,
    [tripID, name, amount, categoryID, transactionDate, note]);

  const payerStatement = 'INSERT INTO payer (transaction_id, user_id, payedForTransaction) VALUES (?, ?, 1);';
  await pool.promise().query(payerStatement, [result.insertId, userID]);
  return result;
}

// Delete a transaction based on it's transaction id
async function deleteTransaction(transactionID) {
  const pool = await dbConfig();
  const statement = 'DELETE FROM transaction WHERE transaction.transaction_id = ?';
  const [result] = await pool.promise().query(statement, [transactionID]);
  return result;
}

module.exports = {
  getTripTransaction,
  createTransaction,
  deleteTransaction,
};
