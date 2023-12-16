const express = require('express');
const router = express.Router();
const verifyAdminController = require('../controller/verifyAdminController');

router.get('/', verifyAdminController.verify_admin_get);

router.post('/', verifyAdminController.verify_admin_post);

module.exports = router;
