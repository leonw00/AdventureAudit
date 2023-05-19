const { dbConfig } = require('./db');

// Retrieve categories related to the given tripID from the database
async function getTripCategories(tripID) {
  const pool = await dbConfig();
  const statement = 'SELECT category_id, name, icon, colour FROM category WHERE trip_id = ?';
  const [result] = await pool.promise().query(statement, [tripID]);
  return result;
}

// Delete Category with given categoryID
async function deleteCategory(categoryID) {
  const pool = await dbConfig();
  const statement = 'DELETE FROM category WHERE category_id = ?';
  const [result] = await pool.promise().query(statement, [categoryID]);
  return result;
}

// Add new category with the given input
async function createCategory(tripID, name, colour, icon) {
  const pool = await dbConfig();
  const statement = 'INSERT INTO category (trip_id, name, colour, icon) VALUES (?, ?, ?, ?);';
  const [result] = await pool.promise().query(statement, [tripID, name, colour, icon]);
  return result;
}

module.exports = {
  getTripCategories,
  deleteCategory,
  createCategory,
};
