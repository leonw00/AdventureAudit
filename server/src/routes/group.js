const express = require('express');
const {
  createGroupMemberController,
  deleteGroupMemberController,
} = require('../controllers/group');

const router = express.Router();

router.post('/', createGroupMemberController);
router.delete('/trip/:trip_id/user/:user_id', deleteGroupMemberController);

module.exports = router;
