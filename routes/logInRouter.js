const express = require('express');
const router = express.Router();
const logInController = require('../controller/logInController');

router.get('/', logInController.log_in_get);

router.post('/', logInController.log_in_post);

module.exports = router;
