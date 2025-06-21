const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  nickName: {
    type: Schema.Types.String,
    required: [true, 'El nickName es requerido'],
    unique: [true, 'El nickName ya se encuentra registrado']
  },
  email: {
    type: Schema.Types.String,
    required: [true, 'El email es requerido'],
    unique: [true, 'El email ya se encuentra registrado']
  },
  followers: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  following: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
},
  { collection: 'users' }
);

userSchema.set("toJSON", {
  transform: (_, ret) => {
    delete ret.__v
    delete ret._id
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User;
