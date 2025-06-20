const mongoose = require('mongoose');
const { Schema } = mongoose;

const postImageSchema = new Schema({
  url: { type: String, required: true },
  //postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true } //Esto ya no sirve, se agrega el id o url de la imagen dirct en post
}, {
  timestamps: false
});

module.exports = postImageSchema;
