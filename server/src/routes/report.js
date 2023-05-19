const express = require('express');
const {
  getTotalTripExpenseController,
  getTopFiveTransactionsController,
  getTransactionSummaryByCategoryController,
  getDebtRelationController,
} = require('../controllers/report');

const router = express.Router();

router.get('/sum', getTotalTripExpenseController);
router.get('/transaction', getTopFiveTransactionsController);
router.get('/category', getTransactionSummaryByCategoryController);
router.get('/debt', getDebtRelationController);

module.exports = router;
