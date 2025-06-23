const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
  description: {
    type: Schema.Types.String,
    required: [true, 'description es requerido']
  },
  /*nickName: {
    type: Schema.Types.String,
    required: [true, 'El nickName es requerido']
  },*/
  fecha: {
    type: Schema.Types.Date,
    required: [true, 'La fecha es requerida']
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  imagenes: [{
    type: Schema.Types.ObjectId,
    ref: 'Post_Image',
  }],
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'Tag',
  }]

}, {
  collection: 'posts'
});

postSchema.set("toJSON", {
  virtuals: true,
  transform: (_, ret) => {
    delete ret.__v
    delete ret._id
  }
})

const Post = mongoose.model('Post', postSchema)
module.exports = Post;
