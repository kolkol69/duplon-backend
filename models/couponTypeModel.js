const mongoose = require('mongoose')

const { Schema } = mongoose
const couponTypeSchema = new Schema({
  html: { type: String },
  val: { type: Number, require: true },
  title: { type: String, require: true },
  descr: { type: String, require: true }
})
const CouponType = mongoose.model('CouponType', couponTypeSchema)

module.exports = CouponType
