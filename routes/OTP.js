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

route.get("/OTP", (req, res, next) => {
  res.status(200).send(req.cookies);
});

module.exports = route;