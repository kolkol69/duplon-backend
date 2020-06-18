const express = require("express");
const router = express.Router();
const User = require("../../db/models/user");

router.get("/", function (req, res, next) {
  findUsers(req, res);
});

module.exports = router;

const findUsers = async (req, res) => {
  try {
    const users = await User.find({});
    console.log("users", users);
    res.json(users);
  } catch (err) {
    console.log("error", err);
  }
};
