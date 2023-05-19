// transaction stub
const AppError = require('../../errors');

const {
  validateTransactionIdPath,
  validateTripIdPath,
  validateTransactionPostBody,
} = require('../../utils/validators');

const errMsg = 'An error occured with the transaction API';

// Retrieve transactions related to the given trip_id
async function getTripTransactionController(req, res, next) {
  try {
    const { error } = validateTripIdPath(req.params);
    if (error) throw error;

    const transaction = [
      {
        transaction_id: 4,
        trip_id: 2,
        name: 't4',
        amount: '50.0000',
        category_name: 'c3',
        category_colour: '#D6C1E7',
        category_icon: 'icon3',
        transaction_date: 'May/10/2021',
        transaction_time: '15:13:30',
        description: 'description4',
        payers: [
          {
            user_id: 2,
            name: 'name2',
            payedForTransaction: 1,
          },
          {
            user_id: 1,
            name: 'name1',
            payedForTransaction: 0,
          },
          {
            user_id: 3,
            name: 'name3',
            payedForTransaction: 0,
          },
        ],
      },
      {
        transaction_id: 2,
        trip_id: 2,
        name: 't2',
        amount: '1000.0000',
        category_name: 'c2',
        category_colour: '#EECB96',
        category_icon: 'icon2',
        transaction_date: 'May/06/2021',
        transaction_time: '13:11:00',
        description: 'description2',
        payers: [
          {
            user_id: 1,
            name: 'name1',
            payedForTransaction: 1,
          },
          {
            user_id: 2,
            name: 'name2',
            payedForTransaction: 0,
          },
          {
            user_id: 3,
            name: 'name3',
            payedForTransaction: 0,
          },
        ],
      },
    ];
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

    const transaction = {};
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

    const transaction = { affectedRows: 1 };
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
