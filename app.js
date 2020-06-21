const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const passwordsRouter = require("./routes/passwords");
const userRouter = require("./routes/User");
// const couponRouter = require("./routes/Coupon");
const herokuRouter = require("./routes/herokuTest");
require("./db/mongoose");

const app = express();

// show BE readme
require("express-readme")(app, {
  filename: "readme.md",
  routes: ["/", "/readme"],
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/passwords", passwordsRouter);
app.use("/heroku", herokuRouter);
app.use("/tenant/create", userRouter.createTenant);
app.use("/user/create", userRouter.create);
app.use("/user/update", userRouter.update);
app.use("/user/delete", userRouter.delete);
app.use("/user/all", userRouter.findAll);
// app.use("/coupon", couponRouter);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
