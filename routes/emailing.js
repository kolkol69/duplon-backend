const express = require("express");
const router = express.Router();
// const dotenv = require("dotenv").config();

router.get("/", function (req, res, next) {
  const email = process.env.EMAIL_LOGIN;

  res.json([{ hello: email }]);
});

module.exports = router;
