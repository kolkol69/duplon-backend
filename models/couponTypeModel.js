const mongoose = require('mongoose')

const { Schema, ObjectId } = mongoose
const couponTypeSchema = new Schema(
  {
    tenant: { type: ObjectId, ref: 'Tenant' },
    html: { type: String },
    discountType: {
      type: String,
      enum: ['percentage', 'value'],
      default: 'percentage'
    },
    val: {
      type: Number,
      required: true,
      min: [0, 'Discount cant be less than 0']
    },
    title: { type: String, required: true },
    descr: { type: String, required: true },
    user: { type: ObjectId, ref: 'User' }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

couponTypeSchema.pre(/^find/, function populate(next) {
  this.populate('tenant')
  next()
})

const CouponType = mongoose.model('CouponType', couponTypeSchema)

module.exports = CouponType
