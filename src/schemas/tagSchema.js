const mongoose = require('mongoose');
const { Schema } = mongoose;

const tagSchema = new Schema({
  tagName: { type: String, required: true, unique: true }
}, {
  timestamps: false
});

module.exports = tagSchema;
