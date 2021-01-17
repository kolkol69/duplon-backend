const User = require('../models/userModel')
const Tenant = require('../models/tenantModel')
const authFactory = require('./authFactory')

exports.signup = authFactory.signup(Tenant, User)

exports.login = authFactory.login(User)

exports.protect = authFactory.protect(User)

exports.restrictTo = authFactory.restrictTo

exports.forgotPassword = authFactory.forgotPassword(User)

exports.invite = authFactory.invite(User)

exports.resetPassword = authFactory.resetPassword(User)

exports.updatePassword = authFactory.updatePassword(User)
