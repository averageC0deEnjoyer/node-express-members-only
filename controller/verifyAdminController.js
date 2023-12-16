const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const User = require('../models/userModel');

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
      await User.findByIdAndUpdate(req.user.id, { adminStatus: true }, {});
      res.redirect('/');
      console.log(req.user);
      return;
    } else {
      res.render('verify-admin-form', {
        title: 'Wrong code, you are not the chosen admin!',
      });
    }
  }),
];
