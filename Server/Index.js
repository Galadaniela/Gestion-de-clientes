
const app = require('./src/app');

const {sequelize} = require('./src/db');

app.listen(3001, () => {
  sequelize.sync({force: false});

  console.log('listening on port 3001');
});
// const app = require('./src/app.js');
// const { conn } = require('./src/db.js');

// // Syncing all the models at once.
// conn.sync({ force: false }).then(() => {
//   app.listen(3001, () => {
//     console.log('%s listening at 3001'); // eslint-disable-line no-console
//   });
// });
