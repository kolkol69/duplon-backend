const mongoose = require('mongoose')

const { Schema, SchemaTypes } = mongoose
const { ObjectId } = SchemaTypes
const userSchema = new Schema({
  tenantID: { type: ObjectId, require: true },
  login: { type: String, require: true },
  password: { type: String, require: true },
})
const User = mongoose.model('User', userSchema)

module.exports = User
