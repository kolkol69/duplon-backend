const mongoose = require('mongoose')
const moment = require('moment')

const { Schema, SchemaTypes } = mongoose
const { ObjectId } = SchemaTypes
const nextMonth = new Date(moment().add(1, 'month'))

const statusHistorySchema = new Schema({
  userId: { type: ObjectId, required: true },
  status: {
    type: String,
    required: true,
    enum: ['issued', 'expired', 'redeemed']
  },
  changeDate: { type: Date, default: Date.now }
})

const couponSchema = new Schema({
  tenant: { type: ObjectId, ref: 'Tenant' },
  PCId: { type: ObjectId, ref: 'Coupon', default: null }, // pairedCouponId
  history: [statusHistorySchema],
  url: String,
  expDate: { type: Date, default: nextMonth },
  createdAt: { type: Date, default: Date.now },
  type: { type: ObjectId, ref: 'CouponType' }
})

// Adding populate to all queries
couponSchema.pre(/^find/, function populate(next) {
  this.populate({
    path: 'tenant type',
    select: '-__v'
  })
  next()
})

// Embeding couponType into coupon
// couponSchema.pre('save', async function getCouponType(next) {
//   const { typeId } = this.type
//   const type = await CouponType.findById(typeId)

//   this.type = type
//   next()
// })

const Coupon = mongoose.model('Coupon', couponSchema)

module.exports = Coupon
