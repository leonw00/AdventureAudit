const express = require('express');
const {
  getTripTransactionController,
  createTransactionController,
  deleteTransactionController,
} = require('../controllers/transaction');

const router = express.Router();

router.get('/trip/:trip_id', getTripTransactionController);
router.post('/', createTransactionController);
router.delete('/:transaction_id', deleteTransactionController);

module.exports = router;
