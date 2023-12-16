const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    title: {
      type: String,
      minLength: 5,
      maxLength: 20,
      trim: true,
      required: true,
    },
    text: {
      type: String,
      minLength: 5,
      maxLength: 200,
      trim: true,
      required: true,
    },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

messageSchema.virtual('delete_url').get(function () {
  return `/admin/delete/${this._id}`;
});

module.exports = mongoose.model('Message', messageSchema);
