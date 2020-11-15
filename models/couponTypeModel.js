const mongoose = require('mongoose')

const { Schema, ObjectId } = mongoose
const couponTypeSchema = new Schema({
  tenantId: { type: ObjectId, require: true },
  html: { type: String },
  val: {
    type: Number,
    require: true,
    min: [0, 'Discount cant be less than 0']
  },
  title: { type: String, require: true },
  descr: { type: String, require: true }
})
const CouponType = mongoose.model('CouponType', couponTypeSchema)

module.exports = CouponType
