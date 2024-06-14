const express = require("express");
const route = express.Router();
const db = require("../models");

route.post("/truck/create", (req, res, next) => {
  db.Trucktype.create(req.body)
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(400).send(err));
});

route.get("/trucks", (req, res, next) => {
  db.Trucktype.findAll()
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(400).send(err));
});

module.exports = route;
