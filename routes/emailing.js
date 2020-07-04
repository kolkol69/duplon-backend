const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
// const emailResponseTemplate = require("../public/emailRespTemplate.html");

// const dotenv = require("dotenv").config();

router.post("/", async (req, res, next) => {
  const customerEmail = req.body.email;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_LOGIN,
      pass: process.env.EMAIL_PASS,
    },
  });

  let infoCustomer;
  try {
    infoCustomer = await transporter.sendMail({
      from: process.env.EMAIL_LOGIN, // sender address
      to: `${customerEmail}`, // list of receivers
      subject: "Contact request ✔", // Subject line
      text:
        "Thank you for leaving your email address! We will get back to you soon", // plain text body
      html:
        "<p>Thank you for leaving your email address! We will get back to you soon</p>", // html body
    });
  } catch (e) {
    res.json([{ error: e }]);
    next();
  }

  let infoCoumerang;
  try {
    infoCoumerang = await transporter.sendMail({
      from: process.env.EMAIL_LOGIN, // sender address
      to: process.env.EMAIL_LOGIN, // list of receivers
      subject: "Contact request ✔", // Subject line
      text: `Contact request from: ${customerEmail}`, // plain text body
      html: `<p>Contact request from: <b>${customerEmail}</b></p>`, // html body
    });
  } catch (e) {
    res.json([{ error: e }]);
    next();
  }

  // console.log(">>CUSTOMER<<");
  // console.log("Message sent: %s", infoCustomer.messageId);
  // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // // Preview only available when sending through an Ethereal account
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(infoCustomer));
  // // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  // console.log("infoCustomer", infoCustomer);
  // console.log(">>CUSTOMER<<");
  // console.log(">>COUMERANG<<");
  // console.log("Message sent: %s", infoCoumerang.messageId);
  // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // // Preview only available when sending through an Ethereal account
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(infoCustomer));
  // // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  // console.log("infoCoumerang", infoCoumerang);
  // console.log(">>COUMERANG<<");
  // console.log("req", req.body);

  res.sendStatus(200);
});

module.exports = router;
