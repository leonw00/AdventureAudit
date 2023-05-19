const AppError = require('../errors');
const {
  getTripTransaction,
  createTransaction,
  deleteTransaction,
} = require('../models/transaction');
const {
  validateTransactionIdPath,
  validateTripIdPath,
  validateTransactionPostBody,
} = require('../utils/validators');

const errMsg = 'An error occured with the transaction API';

// Retrieve transactions related to the given trip_id
async function getTripTransactionController(req, res, next) {
  try {
    const { error } = validateTripIdPath(req.params);
    if (error) throw error;

    const { trip_id: tripID } = req.params;
    const transaction = await getTripTransaction(tripID);
    return res.status(200).json({ transaction });
  } catch (err) {
    return next(err);
  }
}

// Create a new transaction with the given input
async function createTransactionController(req, res, next) {
  try {
    const { error } = validateTransactionPostBody(req.body);
    if (error) throw error;

    const {
      trip_id: tripID,
      amount,
      category_id: categoryID,
      user_id: userID,
      name,
      transaction_date: transactionDate,
      description,
    } = req.body;
    const transaction = await createTransaction(
      tripID,
      name,
      amount,
      categoryID,
      transactionDate,
      description,
      userID,
    );
    return res.status(200).json({
      statusCode: 200,
      message: 'Transaction created',
      transaction,
    });
  } catch (err) {
    return next(err);
  }
}

// Delete a transaction based on given transaction_id
async function deleteTransactionController(req, res, next) {
  try {
    const { error } = validateTransactionIdPath(req.params);
    if (error) throw error;

    const { transaction_id: transactionID } = req.params;
    const transaction = await deleteTransaction(transactionID);
    if (transaction.affectedRows == 0) {
      return next(new AppError(errMsg, 400));
    }
    return res.status(200).json({
      statusCode: 200,
      message: 'Transaction deleted',
      transaction,
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  getTripTransactionController,
  createTransactionController,
  deleteTransactionController,
};
