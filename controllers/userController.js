const User = require('../models/userModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const factory = require('./handleFactory')

const filterObj = (obj, ...fields) => {
  const newObj = {}

  Object.keys(obj).forEach((el) => {
    if (fields.includes(el)) {
      newObj[el] = obj[el]
    }
  })

  return newObj
}

exports.getMe = catchAsync(async (req, res, next) => {
  req.params.id = req.user.id

  next()
})

exports.deleteMe = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id, { active: false })

  if (!user) {
    return next(new AppError('Could not find client with that id'))
  }

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

exports.createUser = factory.createOne(User)
exports.getAllUsers = factory.getAll(User)
exports.getUser = factory.getOne(User)
exports.updateUser = factory.updateOne(User)
exports.deleteUser = factory.deleteOne(User)
