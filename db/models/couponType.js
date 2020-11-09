const mongoose = require('mongoose')

const { Schema, SchemaTypes } = mongoose
const { ObjectId } = SchemaTypes
const couponTypeSchema = new Schema({
  tenantId: { type: ObjectId, require: true },
  name: { type: String, require: true },
  paired: { type: Boolean, require: true },
  html: { type: String, require: false }
})
const CouponType = mongoose.model('CouponType', couponTypeSchema)

module.exports = CouponType
