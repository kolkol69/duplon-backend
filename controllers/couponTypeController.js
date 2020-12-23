const CouponType = require('../models/couponTypeModel')
const factory = require('./handleFactory')

exports.setUserTenantIds = (req, _res, next) => {
  if (!req.body.tenant) {
    req.body.tenant = req.params.tenantId
  }
  if (!req.body.user) {
    req.body.user = req.user.id
  }

  next()
}

exports.createCouponType = factory.createOne(CouponType)
exports.getAllCouponTypes = factory.getAll(CouponType)
exports.getCouponType = factory.getOne(CouponType)
exports.updateCouponType = factory.updateOne(CouponType)
exports.deleteCouponType = factory.deleteOne(CouponType)
