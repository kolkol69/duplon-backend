const express = require('express')
// const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
// const bodyParser = require('body-parser')
const rateLimit = require('express-rate-limit')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const helmet = require('helmet')
const path = require('path')

const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')
const tenantRouter = require('./routes/tenantRoutes')
const userRouter = require('./routes/userRoutes')
const couponTypeRouter = require('./routes/couponTypeRoutes')
const couponRouter = require('./routes/couponRoutes')
const emailRouter = require('./routes/emailingRoutes')

require('./db/mongoose')

const app = express()

// 1) Global Middlewares

// Set security HTTP headers
app.use(helmet())

if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'))
}

// Limit requests from the same IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
})

app.use('/api', limiter)

app.use(cors())

// app.use(bodyParser.json()) // to support JSON-encoded bodies
// app.use(
//   bodyParser.urlencoded({
//     // to support URL-encoded bodies
//     extended: true
//   })
// )

// Body parser, reading data from body into req.body
app.use(
  express.json({
    limit: '10kb'
  })
)

// Data sanitization against NoSQL query injections
app.use(mongoSanitize())

// Data sanitization against XSS
app.use(xss())

// app.use(express.urlencoded({ extended: false }))
// app.use(cookieParser())

// Serving static files
app.use(express.static(path.join(__dirname, 'public')))

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  // console.log(req.headers)

  next()
})

// show BE readme
require('express-readme')(app, {
  filename: 'readme.md',
  routes: ['/', '/readme']
})

app.use('/send-email', emailRouter)

app.use('/api/v1/users', userRouter)
app.use('/api/v1/tenants', tenantRouter)
app.use('/api/v1/coupons/type', couponTypeRouter)
app.use('/api/v1/coupons', couponRouter)
app.use('/api/postman', (req, res) => {
  res.redirect(process.env.API_DOCUMENTATION)
})

// catch 404
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

app.use(globalErrorHandler)

module.exports = app
