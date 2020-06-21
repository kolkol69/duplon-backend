const express = require("express");
const router = express.Router();
const User = require("../../db/models/user");

router.get("/", function (req, res, next) {
  createUser(req, res, req.query);
});

module.exports = router;

const createUser = async (req, res, data) => {
  const { login, password, tenantID } = data;

  try {
    const user = new User(data);
    await user.save();
    res.render("user", {
      title: "User created",
      body: `Credentials: 
        tenantID: ${tenantID}
        login: ${login}
        password: ${password}`,
    });
  } catch (err) {
    console.log("error: ", err);
    res.render("user", {
      title: "User not created",
      body: err,
    });
  }
};
