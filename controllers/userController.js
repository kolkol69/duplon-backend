const User = require('../models/userModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

exports.createUser = catchAsync(async (req, res, _next) => {
  const newUser = await User.create({
    ...req.body
  })

  res.status(201).json({ status: 'success', data: { user: newUser } })
})

exports.getAllUsers = catchAsync(async (_req, res, _next) => {
  const users = await User.find()

  return res.json({
    status: 'success',
    result: users.length,
    data: users
  })
})

exports.getUser = catchAsync(async (req, res, _next) => {
  const user = await User.findById(req.params.userId)

  if (!user) {
    return new AppError('No user found with that id')
  }

  res.json({
    status: 'success',
    data: { user }
  })
})

exports.updateUser = catchAsync(async (req, res, _next) => {
  const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
    new: true
  })

  if (!user) {
    return new AppError('No user found with that id')
  }
  res.status(200).json({ status: 'success', data: { user } })
})

exports.deleteUser = catchAsync(async (req, res, _next) => {
  const user = await User.findByIdAndDelete(req.params.userId)

  if (!user) {
    return new AppError('No user found with that id')
  }
  res.status(200).json({ status: 'success', data: { user } })
})
