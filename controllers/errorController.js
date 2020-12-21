/* eslint-disable no-param-reassign */
const AppError = require('../utils/appError')

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  })
}

const sendErrorProd = (err, res) => {
  // Operationl, trusted error: send msg to the client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    })
    // Programming or other unknown errors: don't send msg to the clinet
  } else {
    // 1) Log error
    console.error('🔥 ERROR 🔥', err)

    // 2) Send generic msg
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong'
    })
  }
}

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`

  return new AppError(message, 400)
}

const handleDublicateFieldsDB = (err) => {
  const value = err.errmsg.match(/"([^"]*)"/)[0]
  const message = `Duplicate field value ${value}. Please use another value.`

  return new AppError(message, 400)
}

module.exports = (err, req, res, _next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res)
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err }

    if (err.stack.includes('CastError')) {
      error = handleCastErrorDB(error)
    }
    if (err.code === 11000) {
      error = handleDublicateFieldsDB(error)
    }
    sendErrorProd(error, res)
  }
}
