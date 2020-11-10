const createError = require('http-errors')
const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')

const tenantRouter = require('./routes/tenantRoutes')
const userRouter = require('./routes/userRoutes')
// const couponRouter = require("./routes/Coupon");
const emailRouter = require('./routes/emailingRoutes')

require('./db/mongoose')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(cors())
app.use(bodyParser.json()) // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true
  })
)
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// show BE readme
require('express-readme')(app, {
  filename: 'readme.md',
  routes: ['/', '/readme']
})

app.use('/send-email', emailRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/tenants', tenantRouter)
// app.use("/coupon", couponRouter);
app.use('/api', (req, res) => {
  res.redirect(process.env.API_DOCUMENTATION)
})

// catch 404 and forward to error handler
app.use('*', (req, res, next) => {
  next(createError(404))
})

module.exports = app
