const express = require('express');

const router = express.Router();
const country = require('./country');
const user = require('./user');
const trip = require('./trip');
const transaction = require('./transaction');
const category = require('./category');
const report = require('./report');
const group = require('./group');
const payer = require('./payer');
const invite = require('./invite');

router.use('/country', country);
router.use('/trip', trip);
router.use('/user', user);
router.use('/transaction', transaction);
router.use('/category', category);
router.use('/report', report);
router.use('/group', group);
router.use('/payer', payer);
router.use('/invite', invite);

module.exports = router;
