const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')

const userRouter = require('./routes/userRoutes')
// const couponRouter = require("./routes/Coupon");
const emailRouter = require('./routes/emailingRoutes')
require('./db/mongoose')

const app = express()

// show BE readme
require('express-readme')(app, {
  filename: 'readme.md',
  routes: ['/', '/readme'],
})

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(cors())
app.use(bodyParser.json()) // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
)
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/send-email', emailRouter)
app.use('/api/v1/users', userRouter)
// app.use("/coupon", couponRouter);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
