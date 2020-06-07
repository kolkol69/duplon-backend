const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const indexRouter = require("./routes/index");
const passwordsRouter = require("./routes/passwords");
const herokuRouter = require("./routes/herokuTest");
require("./db/mongoose");
const User = require("./db/models/user");

const createUser = async (data) => {
  try {
    const user = new User(data);
    await user.save();
  } catch (err) {
    console.log("error: ", err);
  }
};

const findUsers = async () => {
  try {
    const users = await User.find({});
  } catch (err) {
    console.log("error", err);
  }
};

// createUser({
//   name: "Maks",
//   age: 24
// });
// findUsers();

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/passwords", passwordsRouter);
app.use("/heroku", herokuRouter);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

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
