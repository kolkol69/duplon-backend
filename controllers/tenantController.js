const Tenant = require('../models/tenantModel')
const User = require('../models/userModel')
const Coupon = require('../models/couponModel')
const CouponType = require('../models/couponTypeModel')
const catchAsync = require('../utils/catchAsync')
const factory = require('./handleFactory')

// exports.createTenant = catchAsync(async (req, res, _next) => {
//   await Tenant.create(req.body).then(async ({ _id, name }) => {
//     try {
//       await User.create({
//         tenantId: _id,
//         access: USER_ACCESS.FULL,
//         login: `${name.replace(/\s/g, '')}_login`,
//         password: `${name.replace(/\s/g, '')}_password`
//       }).then(() => res.status(200).json({ status: 'success' }))
//     } catch (err) {
//       res.status(400).json({
//         status: 'invalid',
//         message: err
//       })
//     }
//   })
// })

exports.createTenant = factory.createOne(Tenant)
exports.getAllTenants = factory.getAll(Tenant)
exports.getTenant = factory.getOne(Tenant)
exports.updateTenant = factory.updateOne(Tenant)
exports.deleteTenant = factory.deleteOne(Tenant)

exports.getAllTenantUsers = catchAsync(async (req, res, _next) => {
  const users = await User.find({
    tenantId: req.body.tenantId
  })

  res.json({
    status: 'success',
    result: users.length,
    data: users
  })
})

exports.getAllTenantCoupons = catchAsync(async (req, res, _next) => {
  const users = await Coupon.find({
    tenantId: req.body.tenantId
  })

  res.json({
    status: 'success',
    result: users.length,
    data: users
  })
})

exports.getAllTenantCouponsTypes = catchAsync(async (req, res, _next) => {
  const users = await CouponType.find({
    tenantId: req.body.tenantId
  })

  res.json({
    status: 'success',
    result: users.length,
    data: users
  })
})
