const mongoose = require('mongoose')

const { Schema, SchemaTypes } = mongoose
const { ObjectId } = SchemaTypes
const couponUsageSchema = new Schema({
  tenantId: { type: ObjectId, require: true },
  usedAll: { type: Number, require: true, default: 0 }, // previous status
  usedLastPeriod: { type: Number, require: true, default: 0 } // new status
})
const CouponUsage = mongoose.model('CouponUsage', couponUsageSchema)

module.exports = CouponUsage
