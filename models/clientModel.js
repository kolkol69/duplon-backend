const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')

const { Schema, SchemaTypes } = mongoose
const { ObjectId } = SchemaTypes
const clientSchema = new Schema(
  {
    fullName: { type: String, required: [true, 'Please provide a name'] },
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
    coupons: [
      {
        type: ObjectId,
        ref: 'Coupon',
        default: null
      }
    ],
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

clientSchema.pre('save', async function onSave(next) {
  if (!this.isModified('password')) {
    return next()
  }

  this.password = await bcrypt.hash(this.password, 10)
  this.passwordConfirm = undefined
  next()
})

clientSchema.methods.correctPassword = function checkPassword(
  candidatePassword,
  userPassword
) {
  return bcrypt.compare(candidatePassword, userPassword)
}

clientSchema.methods.changedPasswordAfter = function checkIsPasswordChanged(
  JWTTimestamp
) {
  if (this.passwordChangedAt) {
    const changedTimestamp = this.passwordChangedAt.getTime() / 1000

    return JWTTimestamp < changedTimestamp
  }

  return false
}

clientSchema.methods.createPasswordResetToken = function createToken() {
  const resetToken = crypto.randomBytes(32).toString('hex')

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000

  return resetToken
}

clientSchema.pre('save', function updatePasswordChangeAt(next) {
  if (!this.isModified('password') || this.isNew) {
    return next()
  }

  this.passwordChangedAt = Date.now() - 1000
  next()
})

clientSchema.pre(/^find/, function populate(next) {
  this.populate({
    path: 'coupons',
    select: '-history',
    // TODO: change $ne: 'redeemed'  => $eq: 'issued'
    match: { status: { $ne: 'redeemed' } }
  })
  next()
})

// clientSchema.pre(/^find/, function hideInactiveUsers(next) {
//   this.find({ active: { $ne: false } })
//   next()
// })

const Client = mongoose.model('Client', clientSchema)

module.exports = Client
