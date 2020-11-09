const mongoose = require('mongoose')

const { Schema, SchemaTypes } = mongoose
const { ObjectId, Number } = SchemaTypes
const couponSchema = new Schema({
  code: { type: String, require: true }, //actual code
  couponID: { type: ObjectId, require: true }, //unique globally
  tenantID: { type: ObjectId, require: true }, //tenantID ObjectID?? + we have it in tenanat object - redundancy for searching sake
  random: { type: Number, require: true }, //random
  pairedCouponID: { type: Number, require: true }, // paired couponID
  status: { type: String, require: true }, //status
})
const Coupon = mongoose.model('Coupon', couponSchema)

module.exports = Coupon
