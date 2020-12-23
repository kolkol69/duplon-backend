const mongoose = require('mongoose')

const { Schema, SchemaTypes } = mongoose
const { ObjectId } = SchemaTypes
const now = new Date()
const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, now.getDay())

const statusHistorySchema = new Schema({
  userId: { type: ObjectId, required: true },
  status: {
    type: String,
    required: true,
    enum: ['issued', 'expired', 'redeemed']
  },
  changeDate: { type: Date, default: Date(Date.now()) }
})

const couponSchema = new Schema({
  tenantId: { type: ObjectId, required: true },
  PCId: { type: ObjectId, default: null }, // pairedCouponId
  history: [statusHistorySchema],
  expDate: { type: Date, default: nextMonth },
  createdAt: { type: Date, default: Date(Date.now()) },
  typeId: { type: ObjectId, require: true }
})
const Coupon = mongoose.model('Coupon', couponSchema)

module.exports = Coupon
