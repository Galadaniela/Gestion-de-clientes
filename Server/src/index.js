// ==============================================================
// 🚀 INICIO DEL SERVIDOR BACKEND (SUZ CRM)
// ==============================================================
require("dotenv").config();
const app = require("./app");
const { sequelize } = require("./db");

const PORT = process.env.PORT || 3001;

(async () => {
  try {
    // 1. Probamos que la conexión con MySQL sea exitosa
    await sequelize.authenticate();
    console.log("✅ Conexión a MySQL OK");

    // 2. Sincronizamos las tablas de forma segura sin borrar datos:
    // Con "alter: true", Sequelize revisa la base de datos existente.
    // Si agregamos columnas nuevas en los modelos (ej: contacto, frecuencia, cantidadKg),
    // Sequelize ejecuta un "ALTER TABLE" para crearlas automáticamente,
    // conservando intactos todos los clientes y ventas ya guardadas.
    await sequelize.sync({ alter: true });
    console.log("✅ Tablas sincronizadas con MySQL (columnas actualizadas sin borrar datos)");

    // 3. Ponemos a escuchar el servidor Express
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error al arrancar el servidor:", error.message);
    process.exit(1);
  }
})();
