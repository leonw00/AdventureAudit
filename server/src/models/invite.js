const { dbConfig } = require('./db');

const inviteFields = 'invite.user_id, invite.trip_id, trip.name, DATE_FORMAT(trip.start_date_time,"%b/%d/%Y") as start_date, DATE_FORMAT(trip.end_date_time,"%b/%d/%Y") as end_date, invite.inviter_id, user.name as inviter_name';
const joinTrip = 'LEFT JOIN trip on invite.trip_id = trip.trip_id';
const joinInviter = 'LEFT JOIN user on invite.inviter_id = user.user_id';

// Get the invites related to the given userID
async function getInvites(userID) {
  const pool = await dbConfig();
  const statement = `SELECT ${inviteFields} FROM invite ${joinTrip} ${joinInviter} WHERE invite.user_id = ?;`;
  const [result] = await pool.promise().query(statement, [userID]);
  return result;
}

// Create a new invite with the given tripID and userID
async function createInvite(tripID, userID, inviterID) {
  const pool = await dbConfig();
  const statement = 'INSERT INTO invite (trip_id, user_id, inviter_id) VALUES (?, ?, ?);';
  const [result] = await pool.promise().query(statement, [tripID, userID, inviterID]);
  return result;
}

// Remove the invite with the given tripID and userID
async function deleteInvite(tripID, userID) {
  const pool = await dbConfig();
  const statement = 'DELETE FROM invite WHERE trip_id = ? AND user_id = ?';
  const [result] = await pool.promise().query(statement, [tripID, userID]);
  return result;
}

module.exports = {
  getInvites,
  createInvite,
  deleteInvite,
};
