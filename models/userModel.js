const mongoose = require('mongoose');
require('mongoose-type-email');

const Schema = mongoose.Schema;

const validateEmail = function (email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
  },
  password: { type: String, required: true, trim: true },
  fullname: { type: String, required: true, trim: true },
  membershipStatus: { type: Boolean, default: false },
  adminStatus: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', userSchema);
