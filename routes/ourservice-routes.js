const express = require("express");
const route = express.Router();
const db = require("../models");

route.post("/service/create", (req, res, next) => {
  db.Ourservice.create({
    title: req.body.title,
    desc: req.body.desc,
  })
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(400).send(err));
});

route.get("/services", (req, res, next) => {
  db.Ourservice.findAll()
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(400).send(err));
});

module.exports = route;
