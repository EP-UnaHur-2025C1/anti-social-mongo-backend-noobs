const mongoose = require('mongoose');
const { Schema } = mongoose;

const postImageSchema = new Schema({
  url: {
    type: Schema.Types.String,
    required: [true, 'la url es requerida']
  }
}, {
  collection: 'post_images'
});

postImageSchema.set("toJSON", {
  virtuals: true,
  transform: (_, ret) => {
    delete ret.__v
    delete ret._id
  }
})

const Post_Image = mongoose.model('Post_Image', postImageSchema)
module.exports = Post_Image;

