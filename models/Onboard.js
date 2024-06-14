module.exports = (sequelize, Datatype) => {
    const Onboard = sequelize.define("Onboard", {
      title: {
        type: Datatype.STRING,
        allowNull: false,
      },
      desc: {
        type: Datatype.STRING,
        allowNull: false,
      },
      image: {
        type: Datatype.STRING,
        allowNull: false,
      },
    });
    
    return Onboard;
  };
  