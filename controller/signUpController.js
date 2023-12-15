const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

exports.sign_up_get = asyncHandler((req, res, next) => {
  res.render('sign-up-form', { title: 'Sign-up Form' });
});

exports.sign_up_post = [
  body('email')
    .trim()
    .isLength({ min: 3 })
    .exists()
    .withMessage('email exists already')
    .escape(),
  body('password').trim().isLength({ min: 2 }).escape(),
  body('passwordConfirmation').custom((value, { req }) => {
    return value === req.body.password;
  }),

  body('fullname').trim().isLength({ min: 3 }).escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const user = new User({
      email: req.body.email,
      password: req.body.password,
      fullname: req.body.fullname,
    });

    if (!errors.isEmpty()) {
      res.render('sign-up-form', {
        title: 'Sign-up Form',
        user: user,
        errors: errors.array(),
      });
      return; // this return might not needed i think but its a good habit
    } else {
      const isEmailExists = await User.findOne({
        email: req.body.email,
      }).exec();
      if (isEmailExists) {
        res.render('sign-up-form', {
          title: 'Sign-up Form',
          errors: { error: { msg: 'email exists already' } },
        });
        return; // this return might not needed i think but its a good habit
      } else {
        bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
          try {
            const validatedUser = new User({
              email: req.body.email,
              password: hashedPassword,
              fullname: req.body.fullname,
            });
            await validatedUser.save();
            res.redirect('/');
          } catch (err) {
            return next(err);
          }
        });
      }
    }
  }),
];
