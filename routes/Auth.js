const express = require("express");
const route = express.Router();
const db = require("../models");
var validator = require("email-validator");
var validate = require("validatorjs");
const Gotp = require("../functions/generateOTP");
const sendmail = require("../functions/mailer");
const bcrypt = require("bcrypt");

route.post("/signin", async (req, res, next) => {
  var user;
  if (validator.validate(req.body.user)) {
    user = await db.User.findOne({
      where: { email: req.body.user },
      include: db.Profile,
    });
  } else {
    user = await db.User.findOne({
      where: { username: req.body.user },
      include: db.Profile,
    });
  }

  if (user === null) {
    res.status(400).send({
      error: "there is no account with these credentials please sign up .",
    });
  } else {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.status(200).send(user);
    } else {
      res
        .status(400)
        .send({ error: "These credentials do not match our records." });
    }
  }
});

route.post("/signup", async (req, res, next) => {
  let validation = new validate(
    req.body,
    {
      user: "required|email",
      password: "required|min:8",
      firstname: "required|string|min:3",
      lastname: "required|string|min:3",
    },
    {
      "required.user": "Without an email we can't reach you!.",
      "email.user": "The email format is invalid.",
    }
  );

  if (validation.passes()) {
    const hashedpassword = await bcrypt.hash(req.body.password, 10);

    var [user, created] = await db.User.findOrCreate({
      where: { email: req.body.user },
      defaults: {
        username: req.body.user.split("@")[0],
        password: hashedpassword,
      },
    });
    if (created) {
      const profile = await db.Profile.create({
        UserId: user.id,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
      });
      sendverificationcode().then(async () => {
        const returnuser = await db.User.findByPk(user.id, {
          include: db.Profile,
        });
        res.status(200).send(returnuser);
      });
    } else {
      res.status(400).send("This email has already been taken.");
    }

    async function sendverificationcode() {
      const otpcode = await Gotp();
      if (res.cookie(req.body.user, otpcode, { maxAge: 60 * 60 * 24 * 1000 })) {
        // (60*60*24) = day
        var mailOptions = {
          from: "saadamams99@gmail.com",
          to: req.body.user,
          subject: "Sending Email using Node.js",
          text: "your verification code is : " + otpcode,
        };

        sendmail(mailOptions);
      }
    }
  } else {
    res.send(validation.errors);
  }
});

route.post("/changepassword/:userId", async (req, res, next) => {
  if (req.body.newpassword === req.body.currpassword) {
    res
      .status(400)
      .send({ error: "The new and current password must not be the same ." });
  } else {
    const hashednewpassword = await bcrypt.hash(req.body.newpassword, 10);
    const user = await db.User.findByPk(req.params.userId);
    if (await bcrypt.compare(req.body.currpassword, user.password)) {
      if (
        await db.User.update(
          { password: hashednewpassword },
          { where: { id: req.params.userId } }
        )
      ) {
        res.status(200).send({ msg: "password updated ." });
      }
    } else {
      res.status(400).send({ error: "current password is incorrect ." });
    }
  }
});

route.post("/changeprofile/:userId", async (req, res, next) => {
  const s = await db.Profile.update(req.body, {
    where: { userId: req.params.userId },
  });
  if (s) {
    res.status(200).send({ msg: " updated success." });
  } else {
    res.status(400).send({ error: "Somthing goes wrong !" });
  }
});

route.post("/changeemail/:userId", async (req, res, next) => {
  let validation = new validate(req.body, {
    email: "required|email",
  });

  if (validation.passes()) {
    const checkemail = await db.User.findOne({
      where: { email: req.body.email },
    });
    if (checkemail === null) {
      sendverificationcode().then(() => {
        res
          .status(200)
          .send({ msg: "please check your inbox to verify email ." });
      });
    } else {
      res
        .status(400)
        .send({ error: "sorry this email attached to another account" });
    }

    async function sendverificationcode() {
      const otpcode = await Gotp();
      if (
        res.cookie(req.body.email, otpcode, { maxAge: 60 * 60 * 24 * 1000 })
      ) {
        // (60*60*24) = day
        var mailOptions = {
          from: "saadamams99@gmail.com",
          to: req.body.email,
          subject: "Sending Email using Node.js",
          text: "your verification code is : " + otpcode,
        };

        sendmail(mailOptions);
      }
    }
  } else {
    res.send(validation.errors);
  }
});

module.exports = route;
