const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const User = require('../models/userModel');

exports.apply_membership_get = asyncHandler(async (req, res, next) => {
  console.log(req.user);
  res.render('apply-membership-form', { title: 'Apply Membership' });
});

exports.apply_membership_post = [
  body('member').trim().escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render('apply-membership-form', { title: 'Apply Membership' });
      return;
    } else if (
      req.body.member.toString() === process.env.MEMBERSHIP_CODE.toString()
    ) {
      await User.findByIdAndUpdate(req.user.id, { membershipStatus: true });
      res.redirect('/');
      console.log(req.user);
      return;
    } else {
      res.render('apply-membership-form', {
        title: 'Wrong, try again!',
      });
    }
  }),
];
//TODO, persist memberStatus data in DB
