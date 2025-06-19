const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
  description: { type: String, required: true },
  //fecha: { type: Date, required: true },
  nickName: { type: String, ref: 'User', required: true },
  imagenes: [{ type: Schema.Types.ObjectId, ref: 'Post_Image' }],
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }]
}, {
  timestamps: false
});

module.exports = postSchema;
