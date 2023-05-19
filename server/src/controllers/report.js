const {
  getTotalTripExpense,
  getTopFiveTransactions,
  getTransactionSummaryByCategory,
  getDebtRelation,
} = require('../models/report');
const {
  validateTripIdPath,
  validateDebtQuery,
} = require('../utils/validators');

// Retrieve total expense of trip based on the given trip_id
async function getTotalTripExpenseController(req, res, next) {
  try {
    const { error } = validateTripIdPath(req.query);
    if (error) throw error;

    const { trip_id: tripID } = req.query;
    const report = await getTotalTripExpense(tripID);
    return res.status(200).json({ report });
  } catch (err) {
    return next(err);
  }
}

// Retrieve top 5 transaction of trip based on the given trip_id
async function getTopFiveTransactionsController(req, res, next) {
  try {
    const { error } = validateTripIdPath(req.query);
    if (error) throw error;

    const { trip_id: tripID } = req.query;
    const result = await getTopFiveTransactions(tripID);
    return res.status(200).json({ result });
  } catch (err) {
    return next(err);
  }
}

// Retrieve how much users spent for each category based on given trip_id
async function getTransactionSummaryByCategoryController(req, res, next) {
  try {
    const { error } = validateTripIdPath(req.query);
    if (error) throw error;

    const { trip_id: tripID } = req.query;
    const result = await getTransactionSummaryByCategory(tripID);
    return res.status(200).json({ result });
  } catch (err) {
    return next(err);
  }
}

/* Retrieve how much money the given user owes to others and who owes
  the user money based on given user_id and trip_id */
async function getDebtRelationController(req, res, next) {
  try {
    const { error } = validateDebtQuery(req.query);
    if (error) throw error;

    const { trip_id: tripID, user_id: userID } = req.query;
    const result = await getDebtRelation(tripID, userID);
    return res.status(200).json({ result });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  getTotalTripExpenseController,
  getTopFiveTransactionsController,
  getTransactionSummaryByCategoryController,
  getDebtRelationController,
};
