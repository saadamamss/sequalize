const express = require("express");
const route = express.Router();
const db = require("../models");

db.User.hasMany(db.Order);

route.post("/user/create", (req, res, next) => {
  db.User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(400).send(err));
});

route.get("/users", (req, res, next) => {
  db.User.findAll({ include: db.Profile })
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(400).send(err));
});
route.get("/user/:id", async (req, res, next) => {
  const user = await db.User.findByPk(req.params.id, { include: db.Profile });
  if (user != null) {
    res.status(200).send(user);
  } else {
    res.status(400).send({});
  }
});

module.exports = route;
