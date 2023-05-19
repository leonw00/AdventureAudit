// report mock
const {
  validateTripIdPath,
  validateDebtQuery,
} = require('../../utils/validators');

// Retrieve total expense of trip based on the given trip_id
async function getTotalTripExpenseController(req, res, next) {
  try {
    const { error } = validateTripIdPath(req.query);
    if (error) throw error;

    const report = [
      {
        trip_total_expense: '1050.0000',
      },
    ];
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

    const result = [
      {
        amount: '10000.0000',
        colour: '#EECB96',
        icon: 'icon2',
        name: 'c2',
        transaction_id: 6,
        transaction_name: 't6',
      },
      {
        amount: '100.0000',
        colour: '#D6C1E7',
        icon: 'icon1',
        name: 'c1',
        transaction_id: 5,
        transaction_name: 't5',
      },
      {
        amount: '100.0000',
        colour: '#D6C1E7',
        icon: 'icon1',
        name: 'c1',
        transaction_id: 9,
        transaction_name: 't9',
      },
      {
        amount: '60.0000',
        colour: '#D6C1E7',
        icon: 'icon1',
        name: 'c1',
        transaction_id: 10,
        transaction_name: 't10',
      },
      {
        amount: '50.0000',
        colour: '#EECB96',
        icon: 'icon2',
        name: 'c2',
        transaction_id: 7,
        transaction_name: 't7',
      },
    ];
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

    const result = [
      {
        amount: '260.0000',
        colour: '#D6C1E7',
        icon: 'icon1',
        name: 'c1',
      },
      {
        amount: '10051.0000',
        colour: '#EECB96',
        icon: 'icon2',
        name: 'c2',
      },
    ];
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
    const result = [
      {
        amount: '33.33333333',
        name: 'name2',
        user_id: 2,
      },
      {
        amount: '5033.33333333',
        name: 'name3',
        user_id: 3,
      },
    ];
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
