const express = require("express");
const router = express.Router();
const generatePassword = require("password-generator");
const Tenant = require("../../db/models/tenant");

router.get("/", function (req, res, next) {
  createTenant(req, res, req.query);
});

module.exports = router;

const createTenant = async (req, res, data) => {
  const { name } = data;
  const identifier = generatePassword(10, false);
  try {
    const tenant = new Tenant({ name, identifier });
    await tenant.save();
    res.set("Content-Type", "text/html");
    res.send(
      new Buffer(`
    <h2>Tenant created</h2>
    <br>
    <p>
    Credentials: 
        tenantID: ${identifier}
        name: ${name}
    </p>`)
    );
  } catch (err) {
    console.log("error: ", err);
    res.set("Content-Type", "text/html");
    res.send(
      new Buffer(`
      <h2>Tenant not created</h2>
      <br>
      <p>${err}</p>`)
    );
  }
};
