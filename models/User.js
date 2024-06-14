module.exports = (sequelize, Datatype) => {
  const User = sequelize.define("User", {
    username: {
      type: Datatype.STRING,
      allowNull: false,
    },
    email: {
      type: Datatype.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Datatype.STRING,
      allowNull: false,
    },
    verified: {
      type: Datatype.DATE,
      defaultValue: null,
    },
  });

  User.associate = (models) => {
    User.hasOne(models.Profile, {
      onDelete: "cascade",
    });
  };

  User.associate = (models) => {
    User.hasMany(models.Order, {
      onDelete: "cascade",
    });
  };
  
  User.associate = (models) => {
    User.hasMany(models.Transaction, {
      onDelete: "cascade",
    });
  };


  return User;
};
