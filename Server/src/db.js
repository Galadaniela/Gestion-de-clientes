// ==============================================================
// 🗄️ CONEXIÓN A BASE DE DATOS MYSQL CON SEQUELIZE (SUZ CRM)
// ==============================================================
// Se utiliza dotenv para no exponer contraseñas en el código fuente.
// Si las variables no existen en .env, usa valores por defecto para no romper el entorno local.

require('dotenv').config();
const { Sequelize } = require('sequelize');
const Clientesmodels = require("./models/Clientes");
const Pedidosmodels = require("./models/Pedidos");

// 1. Leemos las credenciales desde las variables de entorno
const DB_NAME = process.env.DB_NAME || 'gestionclientes';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD !== undefined ? process.env.DB_PASSWORD : 'gala12345';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 3306;

// 2. Si nos conectamos a una base en la nube (ej: TiDB Cloud, Railway), habilitamos SSL
const esRemoto = DB_HOST !== 'localhost' && DB_HOST !== '127.0.0.1';
const dialectOptions = esRemoto
  ? {
      ssl: {
        minVersion: 'TLSv1.2',
        rejectUnauthorized: false,
      },
    }
  : {};

// 3. Creamos la instancia de Sequelize
const sequelize = new Sequelize(
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql',
    dialectOptions,
    logging: false,
  }
);

// 4. Inicializamos los modelos
Clientesmodels(sequelize);
Pedidosmodels(sequelize);

const { Clientes, Pedidos } = sequelize.models;

// 5. Relaciones entre tablas
Clientes.hasMany(Pedidos);
Pedidos.belongsTo(Clientes);

module.exports = { sequelize, ...sequelize.models, conn: sequelize };
