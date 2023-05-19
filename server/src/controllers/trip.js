const AppError = require('../errors');
const {
  getUserTripsByStartEndDate,
  getUserTripsByStartDate,
  getUserTripsByEndDate,
  deleteTrip,
  getTrip,
  createTrip,
  updateTrip,
} = require('../models/trip');
const {
  validateTripIdPath,
  validateTripPutBody,
  validateTripPostBody,
  validateUserIdPath,
  validateTripDateQuery,
} = require('../utils/validators');

const errMsg = 'An error occured with the trip API';

// Retrieve user trips based on the given user_id
async function getUserTripsController(req, res, next) {
  try {
    const { error: pathError } = validateUserIdPath(req.params);
    if (pathError) throw pathError;
    const { error: queryError } = validateTripDateQuery(req.query);
    if (queryError) throw queryError;

    let userTrips = [];
    const { user_id: userID } = req.params;
    const { start_date_time: startDate, end_date_time: endDate } = req.query;
    if (startDate && endDate) {
      userTrips = await getUserTripsByStartEndDate(userID, startDate, endDate);
    } else if (startDate) {
      userTrips = await getUserTripsByStartDate(userID, startDate);
    } else if (endDate) {
      userTrips = await getUserTripsByEndDate(userID, endDate);
    }
    return res.status(200).json({ userTrips });
  } catch (err) {
    return next(err);
  }
}

// Retrieve trips based on the trip_id
async function getTripController(req, res, next) {
  try {
    const { error } = validateTripIdPath(req.params);
    if (error) throw error;

    const { trip_id: tripID } = req.params;
    const userTrip = await getTrip(tripID);
    return res.status(200).json({ userTrip });
  } catch (err) {
    return next(err);
  }
}

// Delete a trip based on given trip_id
async function deleteTripController(req, res, next) {
  try {
    const { error } = validateTripIdPath(req.params);
    if (error) throw error;

    const { trip_id: tripID } = req.params;
    const trip = await deleteTrip(tripID);
    if (trip.affectedRows == 0) {
      return next(new AppError(errMsg, 400));
    }
    return res.status(200).json({
      statusCode: 200,
      message: 'Trip deleted',
      trip,
    });
  } catch (err) {
    return next(err);
  }
}

// Creates a new trip with the given input
async function createTripController(req, res, next) {
  try {
    const { error } = validateTripPostBody(req.body);
    if (error) throw error;

    const {
      name, budget, country_id: countryID, startDateTime, endDateTime, user_id: userID,
    } = req.body;
    const trip = await createTrip(
      name,
      budget,
      countryID,
      startDateTime,
      endDateTime,
      userID,
    );
    return res.status(200).json({
      statusCode: 200,
      message: 'Trip created',
      trip,
    });
  } catch (err) {
    return next(err);
  }
}

// Update a trip based on the given trip_id
async function updateTripController(req, res, next) {
  try {
    const { error: pathError } = validateTripIdPath(req.params);
    if (pathError) throw pathError;
    const { error: bodyError } = validateTripPutBody(req.body);
    if (bodyError) throw bodyError;

    const { trip_id: tripID } = req.params;
    const {
      name, budget, country_id: countryID, startDateTime, endDateTime,
    } = req.body;
    const trip = await updateTrip(
      name,
      budget,
      countryID,
      startDateTime,
      endDateTime,
      tripID,
    );
    if (trip.affectedRows == 0) {
      return next(new AppError(errMsg, 400));
    }
    return res.status(200).json({
      statusCode: 200,
      message: 'Trip updated',
      trip,
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  getUserTripsController,
  deleteTripController,
  getTripController,
  createTripController,
  updateTripController,
};
