const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const { Schema, SchemaTypes } = mongoose
const { ObjectId } = SchemaTypes
const userSchema = new Schema({
  tenantId: { type: ObjectId, required: true },
  role: {
    type: String,
    enum: ['user', 'head', 'admin'],
    default: 'user'
  },
  login: {
    type: String,
    required: [true, 'Please provide a valid login'],
    unique: true
  },
  email: {
    type: String,
    required: [true, 'Please provide an email address'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email address']
  },
  password: {
    type: String,
    require: true,
    minlength: 4,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator(el) {
        return el === this.password
      },
      message: 'Passwords are not the same!'
    }
  },
  passwordChangedAt: Date
})

userSchema.pre('save', async function onSave(next) {
  if (!this.isModified('password')) {
    return next()
  }

  this.password = await bcrypt.hash(this.password, 10)
  this.passwordConfirm = undefined
  next()
})

userSchema.methods.correctPassword = function checkPassword(
  candidatePassword,
  userPassword
) {
  return bcrypt.compare(candidatePassword, userPassword)
}

userSchema.methods.changedPasswordAfter = function checkIsPasswordChanged(
  JWTTimestamp
) {
  if (this.passwordChangedAt) {
    const changedTimestamp = this.passwordChangedAt.getTime() / 1000

    return JWTTimestamp < changedTimestamp
  }

  return false
}

const User = mongoose.model('User', userSchema)

module.exports = User
