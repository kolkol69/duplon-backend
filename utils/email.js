const nodemailer = require('nodemailer')

const sendEmail = async (options) => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_DEV_HOST,
    port: process.env.EMAIL_DEV_PORT,
    auth: {
      user: process.env.EMAIL_DEV_LOGIN,
      pass: process.env.EMAIL_DEV_PASS
    }
  })

  // 2) Define the email options
  const mailOptions = {
    from: 'Maksym Kolodiy <maksym.kolodiy@coumerang.com>',
    to: options.email,
    subject: options.subject,
    text: options.message
  }

  // 3) Actually send the email
  await transporter.sendMail(mailOptions)
}

module.exports = sendEmail
