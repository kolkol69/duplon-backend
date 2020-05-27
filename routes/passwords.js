var express = require("express");
var router = express.Router();
const generatePassword = require("password-generator");

/* GET users listing. */
router.get("/", function (req, res, next) {
  const count = 5;

  // Generate some passwords
  const passwords = Array.from(Array(count).keys()).map((i) =>
    generatePassword(12, false)
  );

  // Return them as json
  res.json(passwords);
});

module.exports = router;
