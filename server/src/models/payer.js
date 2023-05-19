const { dbConfig } = require('./db');

// Create a new payer to a transaction
async function createPayer(transactionID, userID) {
  const pool = await dbConfig();
  const statement = 'INSERT INTO payer (transaction_id, user_id, payedForTransaction) VALUES (?, ?, 0);'; // leader value always 0 since they are a member
  const [result] = await pool.promise().query(statement, [transactionID, userID]);
  return result;
}

// Remove the payer with the given userID from the given transactionID payment
async function deletePayer(transactionID, userID) {
  const pool = await dbConfig();
  const statement = 'DELETE FROM payer WHERE transaction_id = ? AND user_id = ? AND payedForTransaction = 0';
  const [result] = await pool.promise().query(statement, [transactionID, userID]);
  return result;
}

module.exports = {
  createPayer,
  deletePayer,
};
