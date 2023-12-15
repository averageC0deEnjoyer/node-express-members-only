const express = require('express');
const router = express.Router();
const createMessageController = require('../controller/createMessageController');

router.get('/', createMessageController.create_message_get);

router.post('/', createMessageController.create_message_post);

module.exports = router;
