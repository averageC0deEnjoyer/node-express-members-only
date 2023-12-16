const express = require('express');
const router = express.Router();
const verifyAdminController = require('../controller/verifyAdminController');

router.get('/', verifyAdminController.verify_admin_get);

router.post('/', verifyAdminController.verify_admin_post);

router.get('/delete/:id', verifyAdminController.admin_delete_message_get);

router.post('/delete/:id', verifyAdminController.admin_delete_message_post);

module.exports = router;
