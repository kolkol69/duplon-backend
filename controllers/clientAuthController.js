const Client = require('../models/clientModel')
const catchAsync = require('../utils/catchAsync')
const authFactory = require('./authFactory')

exports.signup = catchAsync(async (req, res, _next) => {
  const newUser = await Client.create({
    fullName: req.body.fullName,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt
  })

  authFactory.createSendToken(newUser, 201, res)
})

exports.login = authFactory.login(Client)

exports.protect = authFactory.protect(Client)

exports.restrictTo = authFactory.restrictTo

exports.forgotPassword = authFactory.forgotPassword(Client)

exports.resetPassword = authFactory.resetPassword(Client)

exports.updatePassword = authFactory.updatePassword(Client)
