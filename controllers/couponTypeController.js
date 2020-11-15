const CouponType = require('../models/couponTypeModel')

exports.createCouponType = async (req, res) => {
  try {
    await CouponType.create({
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

exports.getAllCouponTypes = async (_, res) => {
  try {
    const couponTypes = await CouponType.find()

    return res.json({
      status: 'success',
      result: couponTypes.length,
      data: couponTypes
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

exports.getCouponType = async (req, res) => {
  try {
    const couponType = await CouponType.findById(req.params.couponTypeId)

    res.json({
      status: 'success',
      data: { couponType }
    })
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      data: null,
      error
    })
  }
}

exports.updateCouponType = async (req, res) => {
  try {
    const couponType = await CouponType.findByIdAndUpdate(
      req.params.couponTypeId,
      req.body,
      {
        new: true
      }
    )

    res.status(200).json({ status: 'success', data: { couponType } })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error
    })
  }
}

exports.deleteCouponType = async (req, res) => {
  try {
    const couponType = await CouponType.findByIdAndDelete(
      req.params.couponTypeId
    )

    res.status(200).json({ status: 'success', data: { couponType } })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error
    })
  }
}
