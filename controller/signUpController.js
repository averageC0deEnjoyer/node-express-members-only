const asyncHandler = require('express-async-handler');

exports.sign_up_get = asyncHandler((req, res, next) => {
  res.render('sign-up-form');
});

exports.sign_up_post = asyncHandler((req, res, next) => {});
