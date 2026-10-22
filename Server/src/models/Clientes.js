const {DataTypes} = require("sequelize");
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize) => {
  sequelize.define("Clientes", {
    id: {

      type: DataTypes.STRING(36),       
      defaultValue: () => uuidv4(),
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    provincia: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    localidad: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    calle: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    monto: {
      type: DataTypes.DECIMAL(8, 2),
      // // // allowNull: false,
    },
    deuda: {
      type: DataTypes.DECIMAL(8, 2),
      // allowNull: false,
    },
    canal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING(15),
      allowNull: false,
      /* eslint-disable new-cap */

    },
    saldado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },


  });
};

