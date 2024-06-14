module.exports = (sequelize, Datatype) => {
    const Ourservice = sequelize.define("Ourservice", {
      title: {
        type: Datatype.STRING,
        allowNull: false,
      },
      desc: {
        type: Datatype.STRING,
        allowNull: false,
      },
    });
    
    return Ourservice
  };
  