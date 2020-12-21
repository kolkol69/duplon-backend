require('dotenv').config()
const QRCode = require('qrcode')
const Coupon = require('../models/couponModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

const apiUrl = process.env.API_URL
const COUPON_STATUSES = {
  redemeed: 'redeemed',
  expired: 'expired',
  issued: 'issued'
}

exports.deleteAllCoupons = catchAsync(async (req, res, next) => {
  Coupon.deleteMany({}, (response) => {
    res.status(200).json({
      status: 'success',
      response
    })
  })
})

exports.getQrCode = catchAsync(async (req, res, next) => {
  QRCode.toDataURL(apiUrl, (err, url) => {
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

exports.redeemCoupon = catchAsync(async (req, res, next) => {
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
    return new AppError('Coupon not found with that id')
  }

  res.status(200).json({
    status: 'success'
  })
})

exports.issueCoupon = catchAsync(async (req, res, next) => {
  await Coupon.create({
    ...req.body
  }).then((coupon) => {
    QRCode.toDataURL(
      `${apiUrl}/coupons/redeem?userId=${req.body.history.userId}&couponId=${coupon._id}`,
      (err, url) => {
        if (err) {
          res.status(400).json({
            status: 'fail',
            error: err
          })
        }
        res.status(200).json({
          status: 'success',
          data: { coupon, url }
        })
      }
    )
  })
})

exports.getAllCoupons = catchAsync(async (_, res, next) => {
  const coupons = await Coupon.find()

  return res.json({
    status: 'success',
    result: coupons.length,
    data: coupons
  })
})

exports.getCoupon = catchAsync(async (req, res, next) => {
  const coupon = await Coupon.findById(req.params.couponId)

  res.json({
    status: 'success',
    data: { coupon }
  })
})

exports.updateCoupon = catchAsync(async (req, res, next) => {
  const { history, ...requestBody } = req.body

  if (history) {
    await Coupon.findOneAndUpdate(
      { _id: req.params.couponId },
      { $push: { history } },
      { upsert: true, new: true }
    )
  }

  const coupon = await Coupon.findByIdAndUpdate(
    req.params.couponId,
    requestBody,
    {
      new: true
    }
  )

  if (!coupon) {
    return new AppError('Coupon not found with that id')
  }

  res.status(200).json({ status: 'success', data: coupon })
})

exports.deleteCoupon = catchAsync(async (req, res, next) => {
  const coupon = await Coupon.findByIdAndDelete(req.params.couponId)

  if (!coupon) {
    return new AppError('Coupon not found with that id')
  }
  res.status(200).json({ status: 'success', data: { coupon } })
})
