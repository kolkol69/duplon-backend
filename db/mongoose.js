const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const url = process.env.MLAB_DB_URL;
mongoose.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) console.log(">>>ERROR<<<", err);
  }
);
