const User = require('../models/userModel')
const Tenant = require('../models/tenantModel')
const catchAsync = require('../utils/catchAsync')
const authFactory = require('./authFactory')

exports.signup = catchAsync(async (req, res, _next) => {
  const newTenant = await Tenant.create({
    name: req.body.tenantName
  })
  const newUser = await User.create({
    tenant: newTenant._id,
    login: req.body.login,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt,
    role: req.body.role,
    name: req.body.name
  })

  authFactory.createSendToken(newUser, 201, res)
})

exports.login = authFactory.login(User)

exports.protect = authFactory.protect(User)

exports.restrictTo = authFactory.restrictTo

exports.forgotPassword = authFactory.forgotPassword(User)

exports.resetPassword = authFactory.resetPassword(User)

exports.updatePassword = authFactory.updatePassword(User)
