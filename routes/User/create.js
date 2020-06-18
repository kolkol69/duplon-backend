const express = require("express");
const router = express.Router();
// const User = require("./db/models/user");

router.get("/", function (req, res, next) {
  res.json([{ hello: req.query.hello }]);
});

module.exports = router;

const createUser = async (data) => {
  try {
    const user = new User(data);
    await user.save();
  } catch (err) {
    console.log("error: ", err);
  }
};

// const findUsers = async () => {
//   try {
//     const users = await User.find({});
//     console.log("users", users);
//   } catch (err) {
//     console.log("error", err);
//   }
// };

// createUser({
//   name: "OneFiled",
// });
// findUsers();
