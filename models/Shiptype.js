module.exports = (sequelize, Datatype) => {
  const Shiptype = sequelize.define("Shiptype", {
    name: {
      type: Datatype.STRING,
      allowNull: false,
    },
  });

  return Shiptype;
};
