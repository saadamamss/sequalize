module.exports = (sequelize, Datatype) => {
  const Profile = sequelize.define("Profile", {
    firstname: {
      type: Datatype.STRING,
      allowNull: false,
    },
    lastname: {
      type: Datatype.STRING,
      allowNull: false,
    },
    avatar: {
      type: Datatype.STRING,
      defaultValue: "assets/images/useravatar.png",
    },
    country: {
      type: Datatype.STRING,
      allowNull: true,
    },
    phone: {
      type: Datatype.STRING,
      allowNull: true,
    },
  });

  Profile.associate = (models) => {
    Profile.belongsTo(models.User, {
      onDelete: "cascade",
    });
  };

  return Profile;
};
