const Tenant = require('../models/tenantModel')
const User = require('../models/userModel')
const Coupon = require('../models/couponModel')
const CouponType = require('../models/couponTypeModel')
const APIFeatures = require('../utils/apiFeatures')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

const USER_ACCESS = {
  FULL: 'full',
  DEFAULT: 'default'
}

exports.createTenant = catchAsync(async (req, res, _next) => {
  await Tenant.create(req.body).then(async ({ _id, name }) => {
    try {
      await User.create({
        tenantId: _id,
        access: USER_ACCESS.FULL,
        login: `${name.replace(/\s/g, '')}_login`,
        password: `${name.replace(/\s/g, '')}_password`
      }).then(() => res.status(200).json({ status: 'success' }))
    } catch (err) {
      res.status(400).json({
        status: 'invalid',
        message: err
      })
    }
  })
})

exports.getAllTenants = catchAsync(async (req, res, _next) => {
  const features = new APIFeatures(Tenant.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate()
  const tenants = await features.query

  res.json({
    status: 'success',
    result: tenants.length,
    data: { tenants }
  })
})

exports.getTenant = catchAsync(async (req, res, next) => {
  const tenant = await Tenant.findById(req.params.tenantId)

  if (!tenant) {
    return next(new AppError('No tenant found with that id', 404))
  }

  res.json({
    status: 'success',
    data: { tenant }
  })
})

exports.updateTenant = catchAsync(async (req, res, next) => {
  const tenant = await Tenant.findByIdAndUpdate(req.params.tenantId, req.body, {
    new: true
  })

  if (!tenant) {
    return next(new AppError('No tenant found with that id', 404))
  }

  res.status(200).json({ status: 'success', data: { tenant } })
})

exports.deleteTenant = catchAsync(async (req, res, next) => {
  const tenant = await Tenant.findByIdAndDelete(req.params.tenantId)

  if (!tenant) {
    return next(new AppError('No tenant found with that id', 404))
  }

  res.status(200).json({ status: 'success', data: { tenant } })
})

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
