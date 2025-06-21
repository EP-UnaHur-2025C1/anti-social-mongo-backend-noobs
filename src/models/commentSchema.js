const mongoose = require('mongoose');
const { applyVirtuals } = require('./postSchema');
const { Schema } = mongoose;

const commentSchema = new Schema({
  description: {
    type: Schema.Types.String,
    required: [true, 'description es requerido']
  },
  nickName: {
    type: Schema.Types.String,
    required: [true, 'El nickName es requerido']
  },
  fecha: {
    type: Schema.Types.Date,
    required: [true, 'La fecha es requerida']
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: [true, 'El postId es requerido']
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  collection: 'coments'
});

commentSchema.virtual('esVisible').get(function () {
  const fechaComentario = this.fecha;
  const corte = new Date();
  const meses = parseInt(process.env.COMMENT_EXPIRATION_MONTHS || '6', 10);
  corte.setMonth(corte.getMonth() - meses);
  return fechaComentario >= corte;
});

commentSchema.set("toJSON", {
  virtuals: true,
  transform: (_, ret) => {
    delete ret.__v
    delete ret._id
  }
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment;

