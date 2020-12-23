const CouponType = require('../models/couponTypeModel')
const factory = require('./handleFactory')
const catchAsync = require('../utils/catchAsync')

exports.createCouponType = catchAsync(async (req, res, _next) => {
  // Allow nested routes
  if (!req.body.tenant) {
    req.body.tenant = req.params.tenantId
  }
  if (!req.body.user) {
    req.body.user = req.user.id
  }

  const newDoc = await CouponType.create({
    ...req.body
  })

  res.status(201).json({ status: 'success', data: { data: newDoc } })
})
exports.getAllCouponTypes = factory.getAll(CouponType)
exports.getCouponType = factory.getOne(CouponType)
exports.updateCouponType = factory.updateOne(CouponType)
exports.deleteCouponType = factory.deleteOne(CouponType)
