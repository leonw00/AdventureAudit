const express = require('express');
const {
  createPayerController,
  deletePayerController,
} = require('../controllers/payer');

const router = express.Router();

router.post('/', createPayerController);
router.delete('/transaction/:transaction_id/user/:user_id', deletePayerController);

module.exports = router;
