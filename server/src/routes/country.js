const express = require('express');
const {
  getCountriesController,
} = require('../controllers/country');

const router = express.Router();

router.get('/', getCountriesController);

module.exports = router;
