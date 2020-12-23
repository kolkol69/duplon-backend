const User = require('../models/userModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

const filterObj = (obj, ...fields) => {
  const newObj = {}

  Object.keys(obj).forEach((el) => {
    if (fields.includes(el)) {
      newObj[el] = obj[el]
    }
  })

  return newObj
}

exports.deleteMe = catchAsync(async (req, res, _next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false })

  res.status(204).json({
    status: 'success',
    data: null
  })
})

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data

  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password update. Please use /updateMyPassword route for that.'
      )
    )
  }

  // 2) Update user document
  const filteredBody = filterObj(req.body, 'email', 'name')
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  })

  res.status(200).json({
    status: 'success',
    data: { user: updatedUser }
  })
})

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
  const user = await User.findById(req.params.userId).populate('tenant')

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
