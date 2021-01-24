require('dotenv').config()

const moment = require('moment')
const QRCode = require('qrcode')
const Coupon = require('../models/couponModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const factory = require('./handleFactory')

// const apiUrl =
//   process.env.NODE_ENV === 'production'
//     ? process.env.API_URL_PROD
//     : process.env.API_URL

// exports.createQrCodeForShop = catchAsync(async (req, res, next) => {
//   const userId = '5fe21e282b7a9f07595485d9'
//   const { couponId } = req.body
//   const url = `http://${apiUrl}/api/v1/coupons/redeem?userId=${userId}&status=redeemed&couponId=${couponId}`

//   QRCode.toDataURL(url, (err, image) => {
//     if (err) {
//       return next(new AppError(`Error creating QR Code: ${err}`, 400))
//     }
//     res.status(200).json({
//       status: 'success',
//       data: {
//         image
//       }
//     })
//   })
// })

exports.redeemCoupon = catchAsync(async (req, res, next) => {
  // [noted] TODO: run script to check all coupons for their expiration
  const userId = req.user.id
  const status = 'redeemed'
  const { couponId } = req.query
  const coupon = await Coupon.findOne({ _id: couponId })

  if (!coupon) {
    return next(new AppError('Could not find coupon with that id'))
  }

  const today = new Date()
  const expDate = new Date(coupon.expDate)
  const isExpired = today > expDate

  const expirationDate = moment(expDate).format('dddd, MMMM Do YYYY')

  if (isExpired) {
    if (coupon.status !== 'expired') {
      coupon.status = 'expired'
      await coupon.save()
    }
    return next(
      new AppError(`Coupon expired! Was valid till: ${expirationDate}`)
    )
  }

  if (coupon.status === 'redeemed') {
    return next(new AppError('Coupon was already redeemed!'))
  }

  const history = {
    userId,
    status
  }

  const updateCoupon = await Coupon.findByIdAndUpdate(
    { _id: couponId },
    { $addToSet: { history }, status },
    { new: true }
  )

  res.status(200).json({
    status: 'success',
    data: { coupon: updateCoupon }
  })
})

exports.issueCoupon = catchAsync(async (req, res, next) => {
  req.body.history = {
    userId: req.user.id,
    status: 'issued'
  }
  req.body.tenant = req.user.tenant.id

  const coupon = await Coupon.create(req.body)

  QRCode.toDataURL(`${coupon._id}`, (err, qrCode) => {
    if (err) {
      return next(new AppError(`Error creating QR Code: ${err}`, 400))
    }

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
