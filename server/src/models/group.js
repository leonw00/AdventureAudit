const { dbConfig } = require('./db');

// Creates and adds a new member to the group
async function createGroupMember(tripID, userID) {
  const pool = await dbConfig();
  const statement = 'INSERT INTO `group` (trip_id, user_id, leader) VALUES (?, ?, 0);'; // leader value always 0 since they are a member
  const [result] = await pool.promise().query(statement, [tripID, userID]);
  return result;
}

// Delete the member with the given userID from the given tripID group
async function deleteGroupMember(tripID, userID) {
  const pool = await dbConfig();
  const statement = 'DELETE FROM `group` WHERE trip_id = ? AND user_id = ? AND leader = 0';
  const [result] = await pool.promise().query(statement, [tripID, userID]);
  return result;
}

module.exports = {
  createGroupMember,
  deleteGroupMember,
};
