const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  description: { type: String, required: true },
  fecha: { type: Date, required: true },
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  usuario: { type: String, ref: 'User', required: true }
}, {
  timestamps: false,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

commentSchema.virtual('esVisible').get(function() {
  const fechaComentario = this.fecha;
  const corte = new Date();
  const meses = parseInt(process.env.COMMENT_EXPIRATION_MONTHS || '6', 10);
  corte.setMonth(corte.getMonth() - meses);
  return fechaComentario >= corte;
});

module.exports = commentSchema;
