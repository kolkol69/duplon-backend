const express = require('express')
const nodemailer = require('nodemailer')
const router = express.Router()

router.post('/', async (req, res, next) => {
  const customerEmail = req.body.email

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_LOGIN,
      pass: process.env.EMAIL_PASS,
    },
  })

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_LOGIN, // sender address
      to: `${customerEmail}`, // list of receivers
      subject: 'Contact request ✔', // Subject line
      text:
        'Thank you for leaving your email address! We will get back to you soon', // plain text body
      html:
        '<p>Thank you for leaving your email address! We will get back to you soon</p>', // html body
    })
  } catch (e) {
    res.json([{ error: e }])
    next()
  }
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_LOGIN, // sender address
      to: process.env.EMAIL_LOGIN, // list of receivers
      subject: 'Contact request ✔', // Subject line
      text: `Contact request from: ${customerEmail}`, // plain text body
      html: `<p>Contact request from: <b>${customerEmail}</b></p>`, // html body
    })
  } catch (e) {
    res.json([{ error: e }])
    next()
  }

  res.sendStatus(200)
})

module.exports = router
