const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mainRouter = require("./routes/Index");

const app = express();

// CORS para el frontend local
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use(morgan("dev"));
app.use(express.json());

// Cabeceras adicionales (por si acaso)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// Rutas
app.use(mainRouter);

// Manejo de errores
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = app;