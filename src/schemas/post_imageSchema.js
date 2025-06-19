const mongoose = require('mongoose');
const { Schema } = mongoose;

const postImageSchema = new Schema({
  url: { type: String, required: true },
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true }
}, {
  timestamps: false
});

module.exports = postImageSchema;
