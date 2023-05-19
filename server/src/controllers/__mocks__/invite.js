// invite stub
const AppError = require('../../errors');
const {
  validateDeleteInviteBody,
  validatePostInviteBody,
  validateUserIdPath,
} = require('../../utils/validators');

const errMsg = 'An error occured with the invite API';

// Retrieve invite based on the given user_id
async function getInvitesController(req, res, next) {
  try {
    const { error } = validateUserIdPath(req.params);
    if (error) throw error;

    const invite = [
      {
        user_id: 2,
        trip_id: 1,
        name: 'trip_1',
        start_date: 'Jan/01/2023',
        end_date: 'Apr/03/2023',
        inviter_id: 1,
        inviter_name: 'name1',
      },
      {
        user_id: 2,
        trip_id: 2,
        name: 'trip_2',
        start_date: 'Apr/05/2023',
        end_date: 'Apr/07/2023',
        inviter_id: 1,
        inviter_name: 'name1',
      },
    ];
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

    const invite = {};
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

    const invite = { affectedRows: 1 };
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
