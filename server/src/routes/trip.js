const express = require('express');
const {
  getUserTripsController,
  getTripController,
  createTripController,
  updateTripController,
  deleteTripController,
} = require('../controllers/trip');

const router = express.Router();

router.get('/user/:user_id', getUserTripsController);
router.get('/:trip_id', getTripController);
router.post('/', createTripController);
router.put('/:trip_id', updateTripController);
router.delete('/:trip_id', deleteTripController);

module.exports = router;
