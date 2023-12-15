const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const Message = require('../models/messageModel');

exports.create_message_get = asyncHandler(async (req, res, next) => {
  res.render('create-message', { title: 'Create Message' });
});

exports.create_message_post = [
  body('title').trim().isLength({ min: 3 }).withMessage('too short').escape(),
  body('text').trim().isLength({ min: 3 }).withMessage('too short').escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    console.log(req.user.id);
    const message = new Message({
      title: req.body.title,
      text: req.body.text,
      createdBy: req.user.id,
    });

    if (!errors.isEmpty()) {
      res.render('create-message', {
        title: 'Create Message',
        message: message,
        errors: errors.array(),
      });
    } else {
      await message.save();
      res.redirect('/');
    }
  }),
];
