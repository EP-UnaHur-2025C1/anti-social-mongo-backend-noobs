const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  nickName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: false });

module.exports = userSchema;
