require('dotenv').config()
const QRCode = require('qrcode')
const Coupon = require('../models/couponModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const factory = require('./handleFactory')

const apiUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.API_URL_PROD
    : process.env.API_URL

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
  // TODO: validate if the coupon isn't already 'redeemed' when
  // someone tries to redeeme it one more time

  // TODO: check if coupon is not expired before redeeming it,
  // if it is expired, than return appropriate msg and chaneg it status

  // TODO: run script to check all coupons for their expiration
  const userId = req.user.id
  const { couponId, status } = req.query

  const history = {
    userId,
    status
  }

  const coupon = await Coupon.findOneAndUpdate(
    { _id: couponId },
    { $addToSet: { history }, status }
  )

  if (!coupon) {
    return next(new AppError('Could not find coupon with that id'))
  }

  res.status(200).json({
    status: 'success',
    data: { coupon }
  })
})

exports.issueCoupon = catchAsync(async (req, res, next) => {
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
