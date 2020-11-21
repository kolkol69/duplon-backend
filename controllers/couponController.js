require('dotenv').config()
const QRCode = require('qrcode')
const Coupon = require('../models/couponModel')

const apiUrl = process.env.API_URL
const COUPON_STATUSES = {
  redemeed: 'redeemed',
  expired: 'expired',
  issued: 'issued'
}

exports.deleteAllCoupons = async (req, res) => {
  try {
    Coupon.deleteMany({}, (response) => {
      res.status(200).json({
        status: 'success',
        response
      })
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error
    })
  }
}

exports.getQrCode = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error
    })
  }
}

exports.redeemCoupon = async (req, res) => {
  try {
    const { userId, couponId } = req.query

    const history = {
      userId,
      status: COUPON_STATUSES.redemeed
    }

    await Coupon.findOneAndUpdate({ _id: couponId }, { $push: { history } })
    res.status(200).json({
      status: 'success'
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error
    })
  }
}

exports.issueCoupon = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    })
  }
}

exports.getAllCoupons = async (_, res) => {
  try {
    const coupons = await Coupon.find()

    return res.json({
      status: 'success',
      result: coupons.length,
      data: coupons
    })
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      error
    })
  }
  res.status(204).json({
    status: 'success',
    data: null
  })
}

exports.getCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.couponId)

    res.json({
      status: 'success',
      data: { coupon }
    })
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      data: null,
      error
    })
  }
}

exports.updateCoupon = async (req, res) => {
  try {
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

    res.status(200).json({ status: 'success', data: coupon })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error
    })
  }
}

exports.deleteCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndDelete(req.params.couponId)

    res.status(200).json({ status: 'success', data: { coupon } })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error
    })
  }
}
