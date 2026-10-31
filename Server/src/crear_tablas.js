// ==============================================================
// 🛠️ SCRIPT DE ACTUALIZACIÓN SEGURA DE TABLAS (MIGRACIÓN SUZ)
// ==============================================================
// Este script se puede ejecutar manualmente con: node src/crear_tablas.js
// IMPORTANTE PARA EL EQUIPO:
// Usamos { alter: true } para que agregue columnas nuevas SIN BORRAR datos.
// NUNCA usar { force: true } en producción porque borra todas las filas existentes.

const { sequelize } = require('./db');

(async () => {
  try {
    // 1. Probamos conexión
    await sequelize.authenticate();
    console.log('✅ Conectado a MySQL');

    // 2. Sincronización segura (añade columnas nuevas conservando clientes)
    await sequelize.sync({ alter: true });
    console.log('✅ Tablas actualizadas correctamente (sin pérdida de datos)');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error al actualizar tablas:', error.message);
    process.exit(1);
  }
})();
