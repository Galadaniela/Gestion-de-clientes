const app = require("./app");
const { sequelize } = require("./db");

const PORT = process.env.PORT || 3001;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión a MySQL OK");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error al arrancar:", error.message);
    process.exit(1);
  }
})();