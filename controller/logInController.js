const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

exports.log_in_get = asyncHandler((req, res, next) => {
  res.render('log-in-form', { title: 'Log-in Form' });
});

exports.log_in_post = asyncHandler((req, res, next) => {});
