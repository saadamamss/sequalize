
module.exports = (sequelize, Datatype) => {
  const Transaction = sequelize.define("Transaction", {
    method: {
      type: Datatype.ENUM("cod", "card", "paypal"),
      defaultValue: "cod",
    },
    status: {
      type: Datatype.ENUM("pending", "approved", "decline", "refunded"),
      defaultValue: "pending",
    },
  });

  Transaction.associate = (models) => {
    Transaction.belongsTo(models.User, {
      onDelete: "cascade",
    });
  };
  Transaction.associate = (models) => {
    Transaction.belongsTo(models.Order, {
      onDelete: "cascade",
    });
  };

  return Transaction;
};
