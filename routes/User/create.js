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
    res.set("Content-Type", "text/html");
    res.send(
      new Buffer(`
    <h2>User created</h2>
    <p>
    Credentials: 
      <br>
      tenantID: ${tenantID}
      <br>
      login: ${login}
      <br>
      password: ${password}
    </p>`)
    );
  } catch (err) {
    console.log("error: ", err);
    res.set("Content-Type", "text/html");
    res.send(
      new Buffer(`
    <h2>User not created</h2>
    <br>
    <p>${err}</p>`)
    );
  }
};
