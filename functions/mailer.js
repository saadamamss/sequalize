var nodemailer = require("nodemailer");
const process = require("process");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

function sendmail(mailOptions) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    host: config.MAIL_HOST,
    port: 587,
    secure: false,
    auth: {
      user: config.AUTH_USER,
      pass: config.AUTH_PATH,
    },
  });

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = sendmail;
