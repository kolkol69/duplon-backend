var express = require("express");
var router = express.Router();
const randomGenerator = require("password-generator");

/* GET users listing. */
router.get("/", function (req, res, next) {
  const count = 5;

  // Generate some passwords
  const randomVals = Array.from(Array(count).keys()).map((i) =>
    randomGenerator(12, false)
  );

  // Return them as json
  res.json(randomVals);
});

module.exports = router;
