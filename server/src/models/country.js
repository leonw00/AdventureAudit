const { dbConfig } = require('./db');

// Retrieves all the countries from the database
async function getCountries() {
  const pool = await dbConfig();
  const statement = 'SELECT * FROM country';
  const [result] = await pool.promise().query(statement);
  return result;
}

module.exports = {
  getCountries,
};
