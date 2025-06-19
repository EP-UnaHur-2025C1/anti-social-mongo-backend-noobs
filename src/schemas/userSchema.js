const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nickName: {
    type: String,
    required: [true, "nickname es obligatorio"],
    minlength: [3, "nickname debe contener como mínimo 3 caracteres"],
    maxlength: [12, "nickname debe contener como máximo 12 caracteres"],
    unique: true
  },
  email: {
    type: String,
    required: [true, "email es obligatorio"],
    match: [/.+@.+\..+/, "email debe ser válido"],
    unique: true
  }
}, {
  timestamps: false 
});

const User = mongoose.model('User', userSchema);
module.exports = User
