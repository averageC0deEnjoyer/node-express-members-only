const express = require('express');
const router = express.Router();
const logOutController = require('../controller/logOutController');

router.get('/', logOutController.log_out_get);

module.exports = router;
