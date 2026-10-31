const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize) => {
  // Definimos el modelo "Clientes" en la base de datos
  sequelize.define("Clientes", {
    // Identificador único (UUID) para cada cliente
    id: {
      type: DataTypes.STRING(36),
      defaultValue: () => uuidv4(),
      unique: true,
      allowNull: false,
      primaryKey: true,
    },

    // Razón Social o Nombre del Negocio
    name: {
      type: DataTypes.STRING,
      unique: true,
    },

    // Persona de contacto o encargado dentro del negocio
    contacto: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    // Provincia donde está ubicado (corrientes, chaco o interior)
    provincia: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // Localidad o ciudad
    localidad: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    // Dirección del local
    direccion: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // Número de calle (opcional)
    calle: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },

    // Teléfono o número de WhatsApp
    telefono: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },

    // Canal de contacto (ej: WhatsApp, Local, Distribuidor)
    canal: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // Fecha del pedido o última compra
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    // Frecuencia habitual de compra en días (ej: cada 7, 15 o 30 días)
    frecuencia: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 7, // Por defecto cada 7 días (semanal)
    },

    // ==========================================
    // 📦 DATOS DEL PRODUCTO
    // ==========================================
    producto: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    marca: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    cantidadKg: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 0,
    },

    precioKg: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 0,
    },

    // ==========================================
    // 💰 CUENTA CORRIENTE Y FACTURACIÓN
    // ==========================================
    // Monto pagado por el cliente (DECIMAL 12,2 permite hasta 10 mil millones de pesos)
    monto: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
      defaultValue: 0,
    },

    // Deuda pendiente de pago
    deuda: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
      defaultValue: 0,
    },

    // Indica si la deuda está saldada
    saldado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },

    // Marca si fue creado en la base de datos
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });
};
