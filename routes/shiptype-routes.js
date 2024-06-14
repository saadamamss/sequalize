const express = require("express");
const route = express.Router();
const db = require("../models");

route.post("/shipmenttype/create", (req, res, next) => {
  db.Shiptype.create(req.body)
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(400).send(err));
});

route.get("/shipmenttypes", (req, res, next) => {
  db.Shiptype.findAll()
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(400).send(err));
});

module.exports = route;
