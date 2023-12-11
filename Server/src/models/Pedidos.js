const {DataTypes} = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("Pedidos", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },

  );
};
