const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    title: { type: String, maxLength: 20, trim: true, required: true },
    text: { type: String, maxLength: 200, trim: true, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Message', messageSchema);
