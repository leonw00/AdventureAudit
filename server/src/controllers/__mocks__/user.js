// user stub
const AppError = require('../../errors');
const {
  validateUserIdPath,
  validateEmailPath,
  validateUserBody,
  validateTripIdPath,
} = require('../../utils/validators');

const errMsg = 'An error occured with the User API';

// Retrieve a user based on email address
async function getUserByEmailAddressController(req, res, next) {
  try {
    const { error } = validateEmailPath(req.params);
    if (error) throw error;
    const user = [
      {
        user_id: 1,
        email_id: 'test1@gmail.com',
        name: 'name1',
        country_name: 'Republic of Korea',
        country_code: 'KR',
        currency: '￦',
      },
    ];
    return res.status(200).json({ user });
  } catch (err) {
    return next(err);
  }
}

// Creates a new user with the given input
async function createUserController(req, res, next) {
  try {
    const { error } = validateUserBody(req.body);
    if (error) throw error;
    const user = {};
    return res.status(200).json({
      statusCode: 200,
      message: 'User created',
      user,
    });
  } catch (err) {
    return next(err);
  }
}

// Retrieve a user based on the given user_id
async function getUserController(req, res, next) {
  try {
    const { error } = validateUserIdPath(req.params);
    if (error) throw error;

    const { user_id: userID } = req.params;
    const user = [
      {
        user_id: parseInt(userID, 10),
        email_id: 'test1@gmail.com',
        name: 'name1',
        country_name: 'Republic of Korea',
        country_code: 'KR',
        currency: '￦',
      },
    ];
    return res.status(200).json({ user });
  } catch (err) {
    return next(err);
  }
}

// Update a user based on the given user_id
async function updateUserController(req, res, next) {
  try {
    const { error: pathError } = validateUserIdPath(req.params);
    if (pathError) throw pathError;
    const { error: bodyError } = validateUserBody(req.body);
    if (bodyError) throw bodyError;

    const user = { affectedRows: 1 };
    if (user.affectedRows == 0) {
      return next(new AppError(errMsg, 400));
    }
    return res.status(200).json({
      statusCode: 200,
      message: 'User updated',
      user,
    });
  } catch (err) {
    return next(err);
  }
}

// Retrieve a group based on the given trip_id
async function getGroupController(req, res, next) {
  try {
    const { error } = validateTripIdPath(req.params);
    if (error) throw error;

    const members = [
      {
        user_id: 1,
        email_id: 'test1@gmail.com',
        name: 'name1',
        country_name: 'Republic of Korea',
        country_code: 'KR',
        currency: '￦',
      },
    ];
    return res.status(200).json({ members });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  getUserByEmailAddressController,
  createUserController,
  getUserController,
  updateUserController,
  getGroupController,
};
