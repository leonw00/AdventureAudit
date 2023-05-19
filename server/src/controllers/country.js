const { getCountries } = require('../models/country');

// Retrieve all countries
async function getCountriesController(req, res) {
  const countries = await getCountries();
  return res.status(200).json({ countries });
}

module.exports = {
  getCountriesController,
};
