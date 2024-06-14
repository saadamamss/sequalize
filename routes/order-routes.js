const express = require("express");
const route = express.Router();
const db = require("../models");
const { Op } = require("sequelize");

route.post("/order/create", (req, res, next) => {
  db.Order.create(req.body)
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(400).send(err));
});

route.get("/orders/current-orders/:userId", (req, res, next) => {
  db.Order.findAll({
    where: {
      [Op.and]: [
        { userId: req.params.userId },
        { [Op.not]: [{ status: "delivered" }] },
      ],
    },
  })
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(400).send(err));
});
route.get("/orders/finished-orders/:userId", (req, res, next) => {
  db.Order.findAll({
    where: {
      [Op.and]: [{ status: "delivered" }, { userId: req.params.userId }],
    },
  })
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(400).send(err));
});

module.exports = route;
