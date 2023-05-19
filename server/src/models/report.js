const { dbConfig } = require('./db');

// Retrive the total expense of a trip given its trip ID
async function getTotalTripExpense(tripID) {
  const pool = await dbConfig();
  const statement = 'SELECT SUM(transaction.amount) as trip_total_expense FROM transaction WHERE trip_id = ?';
  const [result] = await pool.promise().query(statement, [tripID]);
  if (result[0].trip_total_expense === null) {
    result[0].trip_total_expense = 0.0;
  }
  return result;
}

// Retrieve top 5 transactions of trip
async function getTopFiveTransactions(tripID) {
  const pool = await dbConfig();
  const statement = `
    SELECT
      t.transaction_id,
      t.name as transaction_name,
      t.amount,
      c.name,
      c.colour,
      c.icon
    FROM
      transaction t
    LEFT JOIN
      category c
    ON
      t.category_id = c.category_id
    WHERE
      t.trip_id = ?
    ORDER BY
      amount DESC
    LIMIT 5;
  `;

  const [result] = await pool.promise().query(statement, [tripID]);
  return result;
}

// Retrieve how much trip spent for each category in a trip
async function getTransactionSummaryByCategory(tripID) {
  const pool = await dbConfig();
  const statement = `
    SELECT
      sum(t.amount) as amount,
      c.name,
      c.colour,
      c.icon
    FROM
      transaction t
    LEFT JOIN
      category c
    ON
      t.category_id = c.category_id
    WHERE
      t.trip_id = ?
    GROUP BY
      c.category_id;
  `;

  const [result] = await pool.promise().query(statement, [tripID]);
  return result;
}

// Retrieve how much money user owe to others and who owes user money
async function getDebtRelation(tripID, userID) {
  const pool = await dbConfig();
  const statement = `
  SELECT tmp2.user_id, SUM(debt) as amount, u.name FROM (
    (SELECT 
      p.user_id, SUM(-amount/user_involved) as debt from payer p 
    LEFT JOIN (
      SELECT 
        transaction_id , count(transaction_id) as user_involved
      FROM 
        payer 
      GROUP BY 
        transaction_id
    ) AS tmp 
    ON 
      p.transaction_id = tmp.transaction_id
    JOIN (
      SELECT 
        t.transaction_id, amount FROM transaction t 
      LEFT JOIN 
        payer p 
      ON 
        t.transaction_id = p.transaction_id 
      WHERE 
        t.trip_id = ? AND payedForTransaction = 0 AND user_id = ?
      ) AS main_not_pay
      ON
        p.transaction_id  = main_not_pay.transaction_id
      WHERE 
        payedForTransaction = 1
      GROUP BY 
        p.user_id 
    )
    UNION
    (SELECT 
      p.user_id, sum(amount/user_involved) as debt from payer p 
    LEFT JOIN (
      SELECT 
        transaction_id , count(transaction_id) as user_involved
      FROM 
        payer 
      GROUP BY 
        transaction_id
      ) AS tmp 
      ON 
        p.transaction_id = tmp.transaction_id
      JOIN (
        SELECT 
          t.transaction_id, amount from transaction t 
        LEFT JOIN 
          payer p 
        ON 
          t.transaction_id = p.transaction_id 
        WHERE 
          t.trip_id = ? AND payedForTransaction = 1 AND user_id = ?
      ) as main_not_pay
      ON
        p.transaction_id  = main_not_pay.transaction_id
      WHERE 
        payedForTransaction = 0
      GROUP BY 
        p.user_id 
  )) tmp2
  LEFT JOIN 
    user u 
  ON 
    tmp2.user_id = u.user_id 
  GROUP BY 
    user_id
  `;

  const [result] = await pool.promise().query(statement, [tripID, userID, tripID, userID]);
  return result;
}

module.exports = {
  getTotalTripExpense,
  getTopFiveTransactions,
  getTransactionSummaryByCategory,
  getDebtRelation,
};
