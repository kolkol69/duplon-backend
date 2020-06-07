const express = require("express");
const router = express.Router();
const generatePassword = require("password-generator");

router.get("/", function (req, res, next) {
  res.json([{ hello: "heroku" }]);
});

module.exports = router;
