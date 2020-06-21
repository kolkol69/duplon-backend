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
    res.render("user", {
      title: "Tenant created",
      body: `
      Credentials: 
        id: ${identifier}
        name: ${name}
      `,
    });
  } catch (err) {
    console.log("error: ", err);
    res.render("user", {
      title: "Tenant not created",
      body: err,
    });
  }
};
