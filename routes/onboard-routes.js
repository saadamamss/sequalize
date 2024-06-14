const express = require("express");
const route = express.Router();
const db = require("../models");

route.post("/onboard/create", (req, res, next) => {
  db.Onboard.create({
    title: req.body.title,
    desc: req.body.desc,
    image: req.body.image,
  })
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(400).send(err));
});

route.get("/onboards", (req, res, next) => {
  db.Onboard.findAll()
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(400).send(err));
});

module.exports = route;
