const mongoose = require('mongoose')

const { Schema, SchemaTypes } = mongoose
const { ObjectId } = SchemaTypes
const now = new Date()
const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, now.getDay())

const couponSchema = new Schema({
  tenantId: { type: ObjectId, require: true },
  code: { type: String, require: true },
  PCId: { type: ObjectId, default: null }, // pairedCouponId
  status: { type: String, require: true },
  random: { type: Number, require: true },
  expDate: { type: Date, default: nextMonth },
  createdAt: { type: Date, default: Date.now() },
  type: { type: String, require: true }
})
const Coupon = mongoose.model('Coupon', couponSchema)

module.exports = Coupon
