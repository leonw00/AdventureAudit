const { dbConfig } = require('./db');

const userFields = 'user.user_id, user.email_id, user.name, country.name as country_name, country.country_code, country.currency';
const joinCountry = 'LEFT JOIN country on user.country_id = country.country_id';
const joinGroup = 'LEFT JOIN user on `group`.user_id = user.user_id';

// Retrieve a user based on their email address
async function getUserByEmailAddress(email) {
  const pool = await dbConfig();
  const statement = `SELECT ${userFields} FROM user ${joinCountry} WHERE email_id = ?`;
  const [result] = await pool.promise().query(statement, [email]);
  return result;
}

// add a user to the user table
async function createUser(name, countryID, email) {
  const pool = await dbConfig();
  const statement = 'INSERT INTO user (name, country_id, email_id) VALUES (?, ?, ?);';
  const [result] = await pool.promise().query(statement, [name, countryID, email]);
  return result;
}

// Retrieve a user based on the given userID
async function getUser(userID) {
  const pool = await dbConfig();
  const statement = `SELECT ${userFields} FROM user ${joinCountry} WHERE user_id = ?`;
  const [result] = await pool.promise().query(statement, [userID]);
  return result;
}

// Update a user in the user table
async function updateUser(userID, name, countryID, email) {
  const pool = await dbConfig();
  const statement = 'UPDATE user SET user.name = ?, user.country_id = ?, user.email_id = ? WHERE user.user_id = ?;';
  const [result] = await pool.promise().query(statement, [name, countryID, email, userID]);
  return result;
}

// Retrieve a group based on the given tripID
async function getGroup(tripID) {
  const pool = await dbConfig();
  const statement = `SELECT ${userFields} FROM \`group\` ${joinGroup} ${joinCountry} WHERE \`group\`.trip_id = ? ORDER BY \`group\`.leader DESC`;
  const [result] = await pool.promise().query(statement, [tripID]);
  return result;
}

module.exports = {
  getUserByEmailAddress,
  createUser,
  getUser,
  updateUser,
  getGroup,
};
