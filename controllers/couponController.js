const Coupon = require('../models/couponModel')

// const QRCode = require('qrcode')
// QRCode.toDataURL('https://google.com', (err, url) => {
//   console.log(url)
//   res.status(200).json({ data: url })
// })

exports.createCoupon = async (req, res) => {
  try {
    await Coupon.create({
      ...req.body
    }).then((response) =>
      res.status(200).json({ status: 'success', data: { response } })
    )
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
  const { history, ...requestBody } = req.body

  if (history) {
    await Coupon.findOneAndUpdate(
      { _id: req.params.couponId },
      { $push: { history } },
      { upsert: true, new: true }
    )
  }

  try {
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
