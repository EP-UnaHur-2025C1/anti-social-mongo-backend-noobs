const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  description: {
    type: String,
    required: [true, "description es obligatorio"],
    minlength: [5, "description debe contener como mínimo 5 caracteres"],
    maxlength: [300, "description debe contener como máximo 300 caracteres"]
  },
  fecha: {
    type: String,
    required: [true, "fecha es obligatoria"],
    match: [/^\d{4}-\d{2}-\d{2}$/, "fecha debe tener el formato YYYY-MM-DD"]
  },
  nickName: {
    type: String,
    required: [true, "nickname es obligatorio"],
    minlength: [3, "nickname debe contener como mínimo 3 caracteres"],
    maxlength: [12, "nickname debe contener como máximo 12 caracteres"],
    ref: 'User'
  },
  imagenes: {
    type: [String],
    validate: {
      validator: function (arr) {
        return arr.length > 0 && arr.every(url => /^https?:\/\/.+/.test(url));
      },
      message: "Debe haber al menos una URL válida de imagen"
    }
  },
  comentarios: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }]
});

module.exports = mongoose.model('Post', postSchema);
