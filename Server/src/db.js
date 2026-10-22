const { Sequelize } = require('sequelize');
const Clientesmodels = require("./models/Clientes");
const Pedidosmodels = require("./models/Pedidos");

const sequelize = new Sequelize(
  'gestionclientes',   // nombre de la base
  'root',              // usuario
  'gala12345',     // ⚠️ CAMBIA esto por tu contraseña real de MySQL
  {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    logging: false,
  }
);

Clientesmodels(sequelize);
Pedidosmodels(sequelize);

const { Clientes, Pedidos } = sequelize.models;

Clientes.hasMany(Pedidos);
Pedidos.belongsTo(Clientes);

module.exports = { sequelize, ...sequelize.models, conn: sequelize };