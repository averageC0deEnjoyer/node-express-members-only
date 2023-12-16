const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const User = require('../models/userModel');
const Message = require('../models/messageModel');

exports.verify_admin_get = asyncHandler(async (req, res, next) => {
  res.render('verify-admin-form', { title: 'Verify Admin' });
});

exports.verify_admin_post = [
  body('adminCode').trim().escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render('verify-admin-form', { title: 'Verify admin' });
    } else if (req.body.adminCode === process.env.ADMIN_CODE) {
      //doesnt need to use toString()
      await User.findByIdAndUpdate(req.user.id, { adminStatus: true }, {});
      res.redirect('/');
      return;
    } else {
      res.render('verify-admin-form', {
        title: 'Wrong code, you are not the chosen admin!',
      });
    }
  }),
];

exports.admin_delete_message_get = asyncHandler(async (req, res, next) => {
  let user = { adminStatus: false };
  if (req.user) {
    user = await User.findById(req.user.id).exec();
  }
  const message = await Message.findById(req.params.id).exec();

  if (!user.adminStatus || !req.user) {
    // to handle if a user is not an admin but have the delete router, so if he access that delete route, he will be redirected to home
    res.redirect('/');
    return;
  }
  res.render('delete-message-form', {
    title: 'Delete Message',
    message: message,
  });
}); // can use middleware isAuthenticated and isAdmin (think like a pipe,  if user isnt auth then redirect login, user isnt admin redirect 404, is both pass then can go to the delete middleware)

exports.admin_delete_message_post = asyncHandler(async (req, res, next) => {
  await Message.findByIdAndDelete(req.body.messageid);
  res.redirect('/');
});
