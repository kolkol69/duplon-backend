const mongoose = require('mongoose')

const { Schema, SchemaTypes } = mongoose
const { ObjectId } = SchemaTypes
const userSchema = new Schema({
  tenantId: { type: ObjectId, required: true },
  access: { type: String, default: 'default' }, // OneOf[default, admin]
  login: {
    type: String,
    required: [true, 'Please provide a valid login'],
    unique: true
  },
  email: {
    type: String,
    required: [true, 'Please provide an email address'],
    unique: true
  },
  password: { type: String, require: true }
})
const User = mongoose.model('User', userSchema)

module.exports = User
