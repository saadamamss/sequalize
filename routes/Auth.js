const express = require("express");
const route = express.Router();
const db = require("../models");
var validator = require("email-validator");
var validate = require("validatorjs");

route.post("/signin", (req, res, next) => {
  if (validator.validate(req.body.user)) {
    Authenticate({ email: req.body.user, password: req.body.password });
  } else {
    Authenticate({ username: req.body.user, password: req.body.password });
  }

  function Authenticate(condition) {
    db.User.findOne({
      where: condition,
    })
      .then((response) => {
        db.Profile.findOne().then((profInfo) => {
          res.status(200).send(
            response
              ? {
                  user: response,
                  profile: profInfo,
                }
              : "These credentials do not match our records."
          );
        });
      })
      .catch((err) => res.status(400).send(err));
  }
});

route.post("/signup", (req, res, next) => {
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
    db.User.findOrCreate({
      where: { email: req.body.user },
      defaults: {
        username: req.body.user.split("@")[0],
        password: req.body.password,
      },
    }).then((resposnse) => {
      const [user, created] = resposnse;
      if (created) {
        createprofile(user);
      } else {
        res.status(400).send("This email has already been taken.");
      }
    });

    function createprofile(userInfo) {
      db.Profile.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
      })
        .then((response) => {
          res.status(200).send({
            user: userInfo,
            profile: response,
          });
        })
        .catch((err) => res.status(400).send(err));
    }
  } else {
    res.send(validation.errors);
  }
});

module.exports = route;
