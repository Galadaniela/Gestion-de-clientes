// ==============================================================
// 🚀 INICIO DEL SERVIDOR BACKEND (SUZ CRM)
// ==============================================================
require("dotenv").config();
const app = require("./app");
const { sequelize } = require("./db");

const PORT = process.env.PORT || 3001;

// 1. Ponemos a escuchar el servidor Express de inmediato en 0.0.0.0
// para que Render y los balanceadores de carga en la nube reconozcan el puerto abierto sin demoras.
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Servidor SUZ corriendo en el puerto ${PORT}`);
});

// 2. Conectamos con la base de datos de manera resiliente
(async () => {
  try {
    // Probamos la conexión con MySQL / TiDB Cloud
    await sequelize.authenticate();
    console.log("✅ Conexión a TiDB Cloud MySQL establecida correctamente");

    // Sincronizamos las tablas preservando los datos
    await sequelize.sync({ alter: true });
    console.log("✅ Tablas sincronizadas con TiDB Cloud MySQL");
  } catch (error) {
    console.error("⚠️ Error en conexión con base de datos:", error.message);
  }
})();
