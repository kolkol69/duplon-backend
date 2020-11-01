const express = require("express");
const router = express.Router();

router.get("/update", function (req, res, next) {
  res.json([{ hello: req.query.hello }]);
});

module.exports = router;
