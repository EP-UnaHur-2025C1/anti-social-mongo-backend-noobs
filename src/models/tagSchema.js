const mongoose = require('mongoose');
const { Schema } = mongoose;

const tagSchema = new mongoose.Schema(
  {
    tagName: {
      type: Schema.Types.String,
      required: [true, 'tagName es requerido'],
      unique: [true, (props) => `El tagName ${props.value} ya se encuentra registrado`]
    },
    posts: [{
      type: Schema.Types.ObjectId,
      ref: 'Post'
    }]
  }, {
  collection: 'tags'
});

tagSchema.set("toJSON", {
  transform: (_, ret) => {
    delete ret.__v
    delete ret._id
    delete posts
  }
})

const Tag = mongoose.model("Tag", tagSchema)
module.exports = Tag;
