const mongoose = require('mongoose')

const { Schema, SchemaTypes } = mongoose
const { ObjectId } = SchemaTypes
const userSchema = new Schema({
  tenantId: { type: ObjectId, require: true },
  access: { type: String, default: 'default' }, // OneOf[default, admin]
  login: { type: String, require: true, unique: true },
  password: { type: String, require: true }
})
const User = mongoose.model('User', userSchema)

module.exports = User
