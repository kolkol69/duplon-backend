const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const User = require('../models/userModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

const signToken = (id) =>
  jwt.sign(
    {
      id
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN
    }
  )

exports.signup = catchAsync(async (req, res, _next) => {
  const newUser = await User.create({
    tenantId: req.body.tenantId,
    access: req.body.access,
    login: req.body.login,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  })

  const token = jwt.sign(
    {
      id: newUser._id
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN
    }
  )

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser
    }
  })
})

exports.login = catchAsync(async (req, res, next) => {
  const { login, password } = req.body

  // 1) Check if login and pass exist
  if (!login || !password) {
    return next(new AppError('Please provide login and password', 400))
  }

  // 2) Check if user exists && pass is correct
  const user = await User.findOne({ login }).select('+password')
  const correct = user && (await user.correctPassword(password, user.password))

  if (!user || !correct) {
    return next(new AppError('Incorrect login or password', 401))
  }
  // 3) If everything is ok, send token to the client
  const token = signToken(user._id)

  res.status(200).json({
    status: 'success',
    token
  })
})

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check if its there
  let token = ''

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return next(
      new AppError('You are not logged in. Please log in to ger access.')
    )
  }

  // 2) Validate token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

  console.log('decoded', decoded)
  // 3) Check if user still exists

  // 4) Check if user changed password after the token was issued

  next()
})
