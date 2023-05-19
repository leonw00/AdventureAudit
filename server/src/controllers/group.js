const AppError = require('../errors');
const { createGroupMember, deleteGroupMember } = require('../models/group');
const { validateGroupBody } = require('../utils/validators');

const errMsg = 'An error occurred with the group API';

// Creates and adds a new member to the group
async function createGroupMemberController(req, res, next) {
  try {
    const { error } = validateGroupBody(req.body);
    if (error) throw error;

    const { trip_id: tripID, user_id: userID } = req.body;
    const member = await createGroupMember(tripID, userID);
    return res.status(200).json({
      statusCode: 200,
      message: 'Group member created',
      member,
    });
  } catch (err) {
    return next(err);
  }
}

// Delete a group member from group based on given trip_id and user_id
async function deleteGroupMemberController(req, res, next) {
  try {
    const { error } = validateGroupBody(req.params);
    if (error) throw error;

    const { trip_id: tripID, user_id: userID } = req.params;
    const member = await deleteGroupMember(tripID, userID);
    if (member.affectedRows == 0) {
      return next(new AppError(errMsg, 400));
    }
    return res.status(200).json({
      statusCode: 200,
      message: 'Group member deleted',
      member,
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  createGroupMemberController,
  deleteGroupMemberController,
};
