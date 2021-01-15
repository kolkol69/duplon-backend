const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const { promisify } = require('util')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const sendEmail = require('../utils/email')

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

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id)
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  }

  if (process.env.NODE_ENV === 'production') {
    cookieOptions.secure = true
  }

  res.cookie('jwt', token, cookieOptions)

  // Remove the password from output
  // eslint-disable-next-line no-param-reassign
  user.password = undefined

  res.status(statusCode).json({
    status: 'success',
    data: { user, token }
  })
}

exports.restrictTo = (...roles) => (req, res, next) => {
  // if (!roles.includes(req.user.role)) {
  //   return next(
  //     new AppError('You do not have permissions to perform this action', 403)
  //   )
  // }

  next()
}

exports.protect = (Model) =>
  catchAsync(async (req, res, next) => {
    // 1) Getting token and check if its there
    let token = ''

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      ;[, token] = req.headers.authorization.split(' ')
    }

    if (!token) {
      return next(
        new AppError('You are not logged in. Please log in to get access.', 401)
      )
    }

    // 2) Validate token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

    // 3) Check if user still exists
    const user = await Model.findById(decoded.id)

    if (!user) {
      return next(
        new AppError(
          'The user belonging to this token does no longer exist',
          401
        )
      )
    }

    // 4) Check if user changed password after the token was issued
    if (user.changedPasswordAfter(decoded.iat)) {
      return next(
        new AppError(
          'User changed password recently! Please log in again.',
          401
        )
      )
    }

    // GRANTING ACCESS TO PROTECTED ROUTER
    req.user = user
    next()
  })

exports.signup = (Tenant, User) =>
  catchAsync(async (req, res, _next) => {
    const role = 'admin'
    const passwordCreatedAt = new Date().toISOString().slice(0, 10)

    const newTenant = await Tenant.create({
      name: req.body.tenantName
    })
    const newUser = await User.create({
      tenant: newTenant._id,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      passwordChangedAt: passwordCreatedAt,
      role,
      fullName: req.body.name
    })

    createSendToken(newUser, 201, res)
  })

exports.login = (Model) =>
  catchAsync(async (req, res, next) => {
    const { email, password } = req.body

    // 1) Check if login and pass exist
    if (!email || !password) {
      return next(new AppError('Please provide email and password', 400))
    }

    // 2) Check if user exists && pass is correct
    const user = await Model.findOne({ email }).select('+password')
    const correct =
      user && (await user.correctPassword(password, user.password))

    if (!user || !correct) {
      return next(new AppError('Incorrect email or password', 401))
    }
    // 3) If everything is ok, send token to the client
    createSendToken(user, 200, res)
  })

exports.forgotPassword = (Model) =>
  catchAsync(async (req, res, next) => {
    // 1) Get user based on POSTed email
    const user = await Model.findOne({ email: req.body.email })

    if (!user) {
      return next(
        new AppError('There is no user with the provided email!', 404)
      )
    }

    // 2) Generate the random reset token
    const resetToken = user.createPasswordResetToken()

    await user.save({ validateBeforeSave: false })

    // 3) Send it to user's email
    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/users/resetPassword/${resetToken}`

    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email.`

    try {
      await sendEmail({
        email: user.email,
        subject: 'Your password reset token (valid for 10 min)',
        message
      })

      res.status(200).json({
        status: 'success',
        message: 'Token sent to email!'
      })
    } catch (err) {
      user.passwordResetToken = undefined
      user.passwordResetExpires = undefined
      await user.save({ validateBeforeSave: false })

      return next(
        new AppError(
          'There was an error sending the email. Try again later.',
          500
        )
      )
    }
  })

exports.resetPassword = (Model) =>
  catchAsync(async (req, res, next) => {
    // 1) Get user based on the token
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex')

    const user = await Model.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    })

    // 2) If token has not expired, and there is a user, set the new passwordResetToken
    if (!user) {
      return next(new AppError('Token is invalid or has expired', 400))
    }
    user.password = req.body.password
    user.passwordConfirm = req.body.passwordConfirm
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save()

    // 3) Update changedPasswordAt property for the user

    // 4) Log the user in, send JWT
    createSendToken(user, 200, res)
  })

exports.updatePassword = (Model) =>
  catchAsync(async (req, res, next) => {
    // 1) Get user from collection
    const user = await Model.findById(req.user.id).select('+password')
    // 2) Check if POSTed pass is correctPassword
    const correct =
      user &&
      (await user.correctPassword(req.body.passwordCurrent, user.password))

    if (!correct) {
      return next(new AppError('Your current password is incorrect', 401))
    }
    // 3) If so, udpate pass
    user.password = req.body.password
    user.passwordConfirm = req.body.passwordConfirm
    // User.findByIdAndUpdate() will NOT work as intended!
    await user.save()

    // 4) Log user in, send JWT
    createSendToken(user, 200, res)
  })
