const AppError = require('../errors');
const { createPayer, deletePayer } = require('../models/payer');
const { validatePayerBody } = require('../utils/validators');

const errMsg = 'An error occured with the payer API';

// Add a payer with the given input
async function createPayerController(req, res, next) {
  try {
    const { error } = validatePayerBody(req.body);
    if (error) throw error;

    const { transaction_id: transactionID, user_id: userID } = req.body;
    const payers = await createPayer(transactionID, userID);
    return res.status(200).json({
      statusCode: 200,
      message: 'Payer created',
      payers,
    });
  } catch (err) {
    return next(err);
  }
}

// Delete a payer based on given transaction_id and user_id
async function deletePayerController(req, res, next) {
  try {
    const { error } = validatePayerBody(req.params);
    if (error) throw error;

    const { transaction_id: transactionID, user_id: userID } = req.params;
    const payers = await deletePayer(transactionID, userID);
    if (payers.affectedRows == 0) {
      return next(new AppError(errMsg, 400));
    }
    return res.status(200).json({
      statusCode: 200,
      message: 'Payer deleted',
      payers,
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  createPayerController,
  deletePayerController,
};
