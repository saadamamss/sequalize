const express = require("express");
const route = express.Router();
const db = require("../models");

route.post("/verifyOTP", async (req, res, next) => {
  if (req.cookies[req.body.user]) {
    if (req.cookies[req.body.user] === req.body.code) {
      res.clearCookie(req.body.user);
      if (
        await db.User.update(
          { verified: new Date() },
          { where: { email: req.body.user } }
        )
      ) {
        res.status(200).send({ msg: "verified" });
      }
    } else {
      res.status(400).send({ error: "incorrect code!" });
    }
  } else {
    res.status(400).send({ error: "this code is expired!" });
  }
});

route.post("/verifyNewEmail/:userId", async (req, res, next) => {
  if (req.cookies[req.body.newEmail]) {
    if (req.cookies[req.body.newEmail] === req.body.code) {
      res.clearCookie(req.body.newEmail);
      if (
        await db.User.update(
          { email: req.body.newEmail },
          { where: { id: req.params.userId } }
        )
      ) {
        const user = await db.User.findByPk(req.params.userId, {
          include: db.profile,
        });

        res.status(200).send(user);
      }
    } else {
      res.status(400).send({ error: "incorrect code!" });
    }
  } else {
    res.status(400).send({ error: "this code is expired!" });
  }
});

route.post("/OTP", (req, res, next) => {
  res.status(200).send(req.cookies);
});
route.post("/addcookie", (req, res, next) => {
  //res.clearCookie("");
  //res.cookie("aliiiii", "111111111111111111");
  res.status(200).send(req.cookies);
});

module.exports = route;
