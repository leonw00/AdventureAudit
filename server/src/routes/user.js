const express = require('express');
const {
  getUserByEmailAddressController,
  getUserController,
  getGroupController,
  createUserController,
  updateUserController,
} = require('../controllers/user');

const router = express.Router();

router.get('/email/:address', getUserByEmailAddressController);
router.get('/:user_id', getUserController);
router.get('/group/:trip_id', getGroupController);
router.post('/', createUserController);
router.put('/:user_id', updateUserController);

module.exports = router;
