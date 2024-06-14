module.exports = (sequelize, Datatype) => {
    const Trucktype = sequelize.define("Trucktype", {
      name: {
        type: Datatype.STRING,
        allowNull: false,
      },
      weightLimit: {
        type: Datatype.STRING,
        allowNull: false,
      },
      image: {
        type: Datatype.STRING,
        allowNull: false,
      },
      dimentions: {
        type: Datatype.DATE,
        defaultValue: null,
      },

    });
  
  
  
    return Trucktype;
  };
  