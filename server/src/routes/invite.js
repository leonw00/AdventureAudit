const express = require('express');
const {
  createInviteController,
  deleteInviteController,
  getInvitesController,
} = require('../controllers/invite');

const router = express.Router();

router.get('/user/:user_id', getInvitesController);
router.post('/', createInviteController);
router.delete('/trip/:trip_id/user/:user_id', deleteInviteController);

module.exports = router;
