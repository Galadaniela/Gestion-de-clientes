const { sequelize } = require('./db');  
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conectado a MySQL');

    await sequelize.sync({ force: true });
    console.log('✅ Tablas creadas correctamente');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
})();