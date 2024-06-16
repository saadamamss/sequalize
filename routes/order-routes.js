const express = require("express");
const route = express.Router();
const db = require("../models");
const { Op } = require("sequelize");
const Trucktype = require("../models/Trucktype");

db.Order.belongsTo(db.User);

route.post("/order/create", (req, res, next) => {
  db.Order.create(req.body)
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(400).send(err));
});

route.get("/orders/:status/:userId", (req, res, next) => {
  if (req.params.status === "pending") {
    getorder({
      [Op.and]: [
        { userId: req.params.userId },
        { [Op.not]: [{ status: "delivered" }] },
      ],
    });
  } else if (req.params.status === "finished") {
    getorder({
      [Op.and]: [{ status: "delivered" }, { userId: req.params.userId }],
    });
  }
  function getorder(condition) {
    db.Order.findAll({
      where: condition,
    })
      .then((response) => {
        response.forEach(async (element, index) => {
          const truck = await db.Trucktype.findByPk(element.truck_type);
          const shiptype = await db.Shiptype.findByPk(element.ship_type);
          response[index].truck_type = truck;
          response[index].ship_type = shiptype;

          index + 1 == response.length && res.status(200).send(response);
          
        });
      })
      .catch((err) => res.status(400).send(err));
  }
});

module.exports = route;
