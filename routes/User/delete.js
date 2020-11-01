const express = require("express");
const router = express.Router();

router.get("/delete", function (req, res, next) {
  res.json([{ hello: "heroku" }]);
});

module.exports = router;
