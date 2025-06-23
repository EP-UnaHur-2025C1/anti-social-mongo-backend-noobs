const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  nickName: {
    type: Schema.Types.String,
    required: [true, 'El nickName es requerido'],
    unique: [true, 'El nickName ya se encuentra registrado'],
    validate: {
      validator: function (v) {
        return typeof v == 'string'
      },
      message: `el valor debe ser de nickName debe ser un String`
    }
  },
  email: {
    type: Schema.Types.String,
    required: [true, 'El email es requerido'],
    unique: [true, 'El email ya se encuentra registrado'],
    match: [/.+\@.+\..+/, 'El email debe ser un email valido'],
    validate: {
      validator: function (v) {
        return typeof v == 'string'
      },
      message: `el valor debe ser de email debe ser un String`
    }
  },
  followers: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  followed: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
},
  { collection: 'users' }
);

userSchema.set("toJSON", {
  virtuals: true,
  transform: (_, ret) => {
    delete ret.__v
    delete ret._id
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User;
