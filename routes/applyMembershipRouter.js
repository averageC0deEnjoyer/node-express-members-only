const express = require('express');
const router = express.Router();
const applyMembershipController = require('../controller/applyMembershipController');

router.get('/', applyMembershipController.apply_membership_get);

router.post('/', applyMembershipController.apply_membership_post);

module.exports = router;
