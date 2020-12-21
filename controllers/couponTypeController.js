const CouponType = require('../models/couponTypeModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

exports.createCouponType = catchAsync(async (req, res, _next) => {
  await CouponType.create({
    ...req.body
  }).then((response) =>
    res.status(200).json({ status: 'success', data: { response } })
  )
})

exports.getAllCouponTypes = catchAsync(async (_, res, _next) => {
  const couponTypes = await CouponType.find()

  return res.json({
    status: 'success',
    result: couponTypes.length,
    data: couponTypes
  })
})

exports.getCouponType = catchAsync(async (req, res, _next) => {
  const couponType = await CouponType.findById(req.params.couponTypeId)

  if (!couponType) {
    return new AppError('No coupon type found with that id')
  }

  res.json({
    status: 'success',
    data: { couponType }
  })
})

exports.updateCouponType = catchAsync(async (req, res, _next) => {
  const couponType = await CouponType.findByIdAndUpdate(
    req.params.couponTypeId,
    req.body,
    {
      new: true
    }
  )

  if (!couponType) {
    return new AppError('No coupon type found with that id')
  }
  res.status(200).json({ status: 'success', data: { couponType } })
})

exports.deleteCouponType = catchAsync(async (req, res, _next) => {
  const couponType = await CouponType.findByIdAndDelete(req.params.couponTypeId)

  if (!couponType) {
    return new AppError('No coupon type found with that id')
  }
  res.status(200).json({ status: 'success', data: { couponType } })
})
