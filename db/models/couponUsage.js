const mongoose = require('mongoose')

const { Schema, SchemaTypes } = mongoose
const { ObjectId, Number } = SchemaTypes
const couponUsageSchema = new Schema({
  tenantId: { type: ObjectId, require: true },
  usedAll: { type: Number, require: true }, //previous status
  usedLastPeriod: { type: Number, require: true }, //new status
})
const CouponUsage = mongoose.model('CouponUsage', couponUsageSchema)

module.exports = CouponUsage
