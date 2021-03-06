const Client = require('../models/clientModel')
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

exports.addCoupon = catchAsync(async (req, res, next) => {
  const client = await Client.findOneAndUpdate(
    { _id: req.user.id },
    { $addToSet: { coupons: req.params.couponId } },
    { new: true }
  )

  if (!client) {
    return next(new AppError('Could not find client with that id'))
  }

  res.status(200).json({
    status: 'success',
    data: { client }
  })
})

exports.getMe = catchAsync(async (req, res, next) => {
  req.params.id = req.user.id
  req.params.options = {
    role: 0,
    __v: 0
  }
  next()
})

exports.deleteMe = catchAsync(async (req, res, next) => {
  const client = await Client.findByIdAndUpdate(req.user.id, { active: false })

  if (!client) {
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
  const filteredBody = filterObj(req.body, 'email', 'fullName')
  const updatedUser = await Client.findByIdAndUpdate(
    req.user.id,
    filteredBody,
    {
      new: true,
      runValidators: true
    }
  )

  res.status(200).json({
    status: 'success',
    data: { user: updatedUser }
  })
})

exports.createUser = factory.createOne(Client)
exports.getAllUsers = factory.getAll(Client)
exports.getUser = factory.getOne(Client)
exports.updateUser = factory.updateOne(Client)
exports.deleteUser = factory.deleteOne(Client)
