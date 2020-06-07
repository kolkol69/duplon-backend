const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const url = `mongodb://${process.env.MLAB_ADMIN_LOGIN}:${process.env.MLAB_ADMIN_PASSWORD}@ds237588.mlab.com:37588/${process.env.MLAB_DB_NAME}`;
console.log("url", url);
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
