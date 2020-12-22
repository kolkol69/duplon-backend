const jwt = require('jsonwebtoken')
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

  console.log('correct', correct)
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
