const AppError = require('../errors');
const {
  getInvites,
  createInvite,
  deleteInvite,
} = require('../models/invite');
const {
  validateDeleteInviteBody,
  validatePostInviteBody,
  validateUserIdPath,
} = require('../utils/validators');

const errMsg = 'An error occured with the invite API';

// Retrieve invite based on the given user_id
async function getInvitesController(req, res, next) {
  try {
    const { error } = validateUserIdPath(req.params);
    if (error) throw error;

    const { user_id: userID } = req.params;
    const invite = await getInvites(userID);
    return res.status(200).json({ invite });
  } catch (err) {
    return next(err);
  }
}

// Create a new invite with the given input
async function createInviteController(req, res, next) {
  try {
    const { error } = validatePostInviteBody(req.body);
    if (error) throw error;

    const {
      trip_id: tripID,
      user_id: userID,
      inviter_id: inviterID,
    } = req.body;
    const invite = await createInvite(tripID, userID, inviterID);
    return res.status(200).json({
      statusCode: 200,
      message: 'Invite created',
      invite,
    });
  } catch (err) {
    return next(err);
  }
}

// Delete an invite based on given trip_id and user_id
async function deleteInviteController(req, res, next) {
  try {
    const { error } = validateDeleteInviteBody(req.params);
    if (error) throw error;

    const { trip_id: tripID, user_id: userID } = req.params;
    const invite = await deleteInvite(tripID, userID);
    if (invite.affectedRows == 0) {
      return next(new AppError(errMsg, 400));
    }
    return res.status(200).json({
      statusCode: 200,
      message: 'Invite deleted',
      invite,
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  getInvitesController,
  createInviteController,
  deleteInviteController,
};
