const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const passport = require('passport');

exports.log_in_get = asyncHandler(async (req, res, next) => {
  res.render('log-in-form', { title: 'Log-in Form' });
});

exports.log_in_post = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/log-in',
});
