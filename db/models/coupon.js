const mongoose = require('mongoose')

const { Schema, SchemaTypes } = mongoose
const { ObjectId, Number } = SchemaTypes
const couponSchema = new Schema({
  code: { type: String, require: true }, // actual code
  couponId: { type: ObjectId, require: true }, // unique globally
  tenantId: { type: ObjectId, require: true }, // tenantID ObjectID?? + we have it in tenanat object - redundancy for searching sake
  random: { type: Number, require: true }, // random
  pairedCouponId: { type: Number, require: true }, // paired couponID
  status: { type: String, require: true } // status
})
const Coupon = mongoose.model('Coupon', couponSchema)

module.exports = Coupon
