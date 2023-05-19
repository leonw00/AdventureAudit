const { dbConfig } = require('./db');

const tripFields = "trip.trip_id, trip.name, trip.budget, trip.country_id, DATE_FORMAT(trip.start_date_time,'%b/%d/%Y') as start_date, DATE_FORMAT(trip.end_date_time,'%b/%d/%Y') as end_date";
const joinFields = 'LEFT JOIN `group` on trip.trip_id = `group`.trip_id';

const tripCurrencyFields = "trip.trip_id, trip.name, trip.budget, country.name as country_name, country.country_code, country.currency, DATE_FORMAT(trip.start_date_time,'%b/%d/%Y') as start_date, DATE_FORMAT(trip.end_date_time,'%b/%d/%Y') as end_date, country.country_id";
const joinCurrencyFields = 'LEFT JOIN country on trip.country_id = country.country_id';

// Add a default category with given tripID
async function addDefaultCategory(tripID) {
  const pool = await dbConfig();
  const statement = 'INSERT INTO category (trip_id, name, colour, icon) VALUES (?, ?, ?, ?);';
  await pool.promise().query(statement, [tripID, 'Food', '#D6C1E7', 'FoodIcon']);
  await pool.promise().query(statement, [tripID, 'Shopping', '#C4ECAC', 'ShoppingBagIcon']);
  await pool.promise().query(statement, [tripID, 'Accomodation', '#F6C1E7', 'BedIcon']);
  await pool.promise().query(statement, [tripID, 'Ticket', '#92D44F', 'TicketIcon']);
  await pool.promise().query(statement, [tripID, 'Sightseeing', '#EECB96', 'SightseeingIcon']);
  await pool.promise().query(statement, [tripID, 'Transport', '#EFA9B6', 'BusIcon']);
  await pool.promise().query(statement, [tripID, 'Flight', '#A9CEEF', 'PlaneIcon']);
}

// Retrieve user's trip from the database with given userID, startDate, and endDate
async function getUserTripsByStartEndDate(userID, startDate, endDate) {
  const pool = await dbConfig();
  const statement = `SELECT ${tripFields} FROM trip ${joinFields} WHERE \`group\`.user_id = ? and trip.start_date_time <= ? and trip.end_date_time >= ?;`;
  const [result] = await pool.promise().query(statement, [userID, startDate, endDate]);
  return result;
}

// Retrieve user's trip from the database with given userID and startDate
async function getUserTripsByStartDate(userID, startDate) {
  const pool = await dbConfig();
  const statement = `SELECT ${tripFields} FROM trip ${joinFields} WHERE \`group\`.user_id = ? AND trip.start_date_time > ? ORDER BY trip.start_date_time DESC;`;
  const [result] = await pool.promise().query(statement, [userID, startDate]);
  return result;
}

// Retrieve user's trip from the database with given userID and endDate
async function getUserTripsByEndDate(userID, endDate) {
  const pool = await dbConfig();
  const statement = `SELECT ${tripFields} FROM trip ${joinFields} WHERE \`group\`.user_id = ? and trip.end_date_time < ? ORDER BY trip.end_date_time DESC;`;
  const [result] = await pool.promise().query(statement, [userID, endDate]);
  return result;
}

// Retrieves a trip from the database with given the tripID
async function getTrip(tripID) {
  const pool = await dbConfig();
  const statement = `SELECT ${tripCurrencyFields} FROM trip ${joinCurrencyFields} WHERE trip.trip_id = ?;`;
  const [result] = await pool.promise().query(statement, [tripID]);
  return result;
}

// Delete trip from database with given tripID
async function deleteTrip(tripID) {
  const pool = await dbConfig();
  const statement = 'DELETE FROM trip WHERE trip_id = ?';
  const [result] = await pool.promise().query(statement, [tripID]);
  return result;
}

// Add new trip with the given input
async function createTrip(name, budget, countryID, startDate, endDate, userID) {
  const pool = await dbConfig();
  const statement = 'INSERT INTO trip (name, budget, country_id, start_date_time, end_date_time) VALUES (?, ?, ?, ?, ?);';
  const [result] = await pool.promise().query(statement,
    [name, budget, countryID, startDate, endDate]);

  const groupStatement = 'INSERT INTO `group` (trip_id, user_id, leader) VALUES (?, ?, ?);';
  await pool.promise().query(groupStatement, [result.insertId, userID, 1]); // creator is leader
  await addDefaultCategory(result.insertId);
  return result;
}

// Update existing trip with given tripID
async function updateTrip(name, budget, countryID, startDate, endDate, tripID) {
  const pool = await dbConfig();
  const statement = 'UPDATE trip SET name = ?, budget = ?, country_id = ?, start_date_time = ?, end_date_time = ? WHERE trip_id = ?';
  const [result] = await pool.promise().query(statement,
    [name, budget, countryID, startDate, endDate, tripID]);
  return result;
}

module.exports = {
  getUserTripsByStartEndDate,
  getUserTripsByStartDate,
  getUserTripsByEndDate,
  deleteTrip,
  getTrip,
  createTrip,
  updateTrip,
};
