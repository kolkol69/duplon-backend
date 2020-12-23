require('dotenv').config()
const QRCode = require('qrcode')
const Coupon = require('../models/couponModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const factory = require('./handleFactory')

const apiUrl = process.env.API_URL
const COUPON_STATUSES = {
  redemeed: 'redeemed',
  expired: 'expired',
  issued: 'issued'
}

exports.getQrCode = catchAsync(async (req, res, _next) => {
  const coupon = await Coupon.findById(req.body.couponId)

  QRCode.toDataURL(coupon.url, (err, url) => {
    if (err) {
      res.status(400).json({
        status: 'fail',
        error: err
      })
    }
    res.status(200).json({
      status: 'success',
      url
    })
  })
})

exports.redeemCoupon = catchAsync(async (req, res, _next) => {
  const { userId, couponId } = req.query

  const history = {
    userId,
    status: COUPON_STATUSES.redemeed
  }

  const coupon = await Coupon.findOneAndUpdate(
    { _id: couponId },
    { $push: { history } }
  )

  if (!coupon) {
    return new AppError('Could not find coupon with that id')
  }

  res.status(200).json({
    status: 'success'
  })
})

exports.issueCoupon = catchAsync(async (req, res, _next) => {
  const coupon = await Coupon.create({
    ...req.body
  })

  const url = `${apiUrl}/coupons/redeem?userId=${req.body.history.userId}&couponId=${coupon._id}`

  QRCode.toDataURL(url, (err, qrCode) => {
    if (err) {
      res.status(400).json({
        status: 'fail',
        error: err
      })
    }

    coupon.url = url
    coupon.save()

    res.status(200).json({
      status: 'success',
      data: { coupon, qrCode }
    })
  })
})

exports.getAllCoupons = factory.getAll(Coupon)
exports.getCoupon = factory.getOne(Coupon)
exports.updateCoupon = factory.updateOne(Coupon)
exports.deleteCoupon = factory.deleteOne(Coupon)
exports.deleteAllCoupons = factory.deleteAll(Coupon)
