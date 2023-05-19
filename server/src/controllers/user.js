const AppError = require('../errors');
const {
  getUserByEmailAddress,
  createUser,
  getUser,
  updateUser,
  getGroup,
} = require('../models/user');
const {
  validateUserIdPath,
  validateEmailPath,
  validateUserBody,
  validateTripIdPath,
} = require('../utils/validators');

const errMsg = 'An error occured with the User API';

// Retrieve a user based on email address
async function getUserByEmailAddressController(req, res, next) {
  try {
    const { error } = validateEmailPath(req.params);
    if (error) throw error;

    const { address } = req.params;
    const user = await getUserByEmailAddress(address);
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

    const { name, country_id: countryID, email } = req.body;
    const user = await createUser(name, countryID, email);
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
    const user = await getUser(userID);
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

    const { user_id: userID } = req.params;
    const { name, email, country_id: countryID } = req.body;
    const user = await updateUser(userID, name, countryID, email);
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

    const { trip_id: tripID } = req.params;
    const members = await getGroup(tripID);
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
