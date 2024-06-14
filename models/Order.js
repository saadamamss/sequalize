
module.exports = (sequelize, Datatype) => {
  const Order = sequelize.define("Order", {
    truck_type: {
      type: Datatype.STRING,
      allowNull: false,
    },
    ship_type: {
      type: Datatype.STRING,
      allowNull: false,
    },
    ship_desc: {
      type: Datatype.STRING,
      allowNull: false,
    },
    pickup_floor: {
      type: Datatype.STRING,
      allowNull: false,
    },
    delivery_floor: {
      type: Datatype.STRING,
      allowNull: false,
    },
    elevator: {
      type: Datatype.ENUM("true", "false"),
      defaultValue: "false",
    },
    trans_service: {
      type: Datatype.ENUM("required", "not required"),
      defaultValue: "required",
    },
    add_worker: {
      type: Datatype.ENUM("required", "not required"),
      defaultValue: "required",
    },
    ship_imgs: {
      type: Datatype.TEXT,
    },
    pickup_location: {
      type: Datatype.STRING,
      allowNull: false,
    },
    deliver_location: {
      type: Datatype.STRING,
      allowNull: false,
    },
    add_worker_cost: {
      type: Datatype.STRING,
      allowNull: true,
      defaultValue: null,
    },
    ship_cost: {
      type: Datatype.STRING,
      allowNull: false,
    },
    total_cost: {
      type: Datatype.STRING,
      allowNull: false,
    },
    status: {
      type: Datatype.ENUM(
        "pending",
        "confirm",
        "picked_up",
        "inway",
        "delivered",
        "canceled"
      ),
      defaultValue:"pending",
    },
  });

  Order.associate = (models) => {
    Order.hasOne(models.Transaction, {
      onDelete: "cascade",
    });
  };

  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      onDelete: "cascade",
    });
  };




  return Order;
};
