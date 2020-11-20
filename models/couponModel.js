const mongoose = require('mongoose')

const { Schema, SchemaTypes } = mongoose
const { ObjectId } = SchemaTypes
const now = new Date()
const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, now.getDay())

const statusHistorySchema = new Schema({
  userId: { type: ObjectId, require: true },
  status: { type: String, require: true }, // OneOf([issued, expired, redeemed])
  changeDate: { type: Date, default: Date.now() }
})

const couponSchema = new Schema({
  tenantId: { type: ObjectId, require: true },
  PCId: { type: ObjectId, default: null }, // pairedCouponId
  history: [statusHistorySchema],
  expDate: { type: Date, default: nextMonth },
  createdAt: { type: Date, default: Date.now() },
  typeId: { type: ObjectId, require: true }
})
const Coupon = mongoose.model('Coupon', couponSchema)

module.exports = Coupon
