// trip stub
const AppError = require('../../errors');
const {
  validateTripIdPath,
  validateTripPutBody,
  validateTripPostBody,
  validateUserIdPath,
  validateTripDateQuery,
} = require('../../utils/validators');

const errMsg = 'An error occured with the trip API';

// Retrieve user trips based on the given user_id
async function getUserTripsController(req, res, next) {
  try {
    const { error: pathError } = validateUserIdPath(req.params);
    if (pathError) throw pathError;
    const { error: queryError } = validateTripDateQuery(req.query);
    if (queryError) throw queryError;

    let userTrips = [];
    const { start_date_time: startDate, end_date_time: endDate } = req.query;
    if (startDate && endDate) {
      userTrips = [
        {
          trip_id: 1,
          name: 'trip_1',
          budget: '10.0000',
          country_id: 3,
          start_date: 'Jan/01/2023',
          end_date: 'Apr/03/2023',
        },
      ];
    } else if (startDate) {
      userTrips = [
        {
          trip_id: 3,
          name: 'trip_3',
          budget: '200.0000',
          country_id: 3,
          start_date: 'Jun/01/2023',
          end_date: 'Jun/15/2023',
        },
        {
          trip_id: 2,
          name: 'trip_2',
          budget: '150.0000',
          country_id: 2,
          start_date: 'Apr/05/2023',
          end_date: 'Apr/07/2023',
        },
      ];
    } else if (endDate) {
      userTrips = [
        {
          trip_id: 4,
          name: 'trip_4',
          budget: '150.0000',
          country_id: 1,
          start_date: 'Dec/12/2022',
          end_date: 'Dec/31/2022',
        },
        {
          trip_id: 5,
          name: 'trip_5',
          budget: '100000.0000',
          country_id: 1,
          start_date: 'Jul/12/2022',
          end_date: 'Jul/15/2022',
        },
        {
          trip_id: 6,
          name: 'trip_6',
          budget: '100000.0000',
          country_id: 2,
          start_date: 'Apr/28/2022',
          end_date: 'Apr/30/2022',
        },
        {
          trip_id: 7,
          name: 'trip_7',
          budget: '100000.0000',
          country_id: 2,
          start_date: 'Jan/09/2022',
          end_date: 'Jan/20/2022',
        },
      ];
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

    const userTrip = [
      {
        trip_id: 1,
        name: 'trip_1',
        budget: '10.0000',
        country_name: 'Indonesia',
        country_code: 'ID',
        country_id: 3,
        currency: 'Rp',
        start_date: 'Jan/01/2023',
        end_date: 'Apr/03/2023',
      },
    ];
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

    const trip = { affectedRows: 1 };
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

    const trip = {};
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

    const trip = { affectedRows: 1 };
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
