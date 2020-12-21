const mongoose = require('mongoose')

const { Schema, ObjectId } = mongoose
const couponTypeSchema = new Schema({
  tenantId: { type: ObjectId, required: true },
  html: { type: String },
  discountType: { type: String, default: 'percentage' }, // oneOf(["percentage", "value"])
  val: {
    type: Number,
    required: true,
    min: [0, 'Discount cant be less than 0']
  },
  title: { type: String, required: true },
  descr: { type: String, required: true }
})
const CouponType = mongoose.model('CouponType', couponTypeSchema)

module.exports = CouponType
