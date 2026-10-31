// ==============================================================
// 🌐 CONFIGURACIÓN DE EXPRESS Y CORS (SUZ CRM)
// ==============================================================
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mainRouter = require("./routes/Index");

const app = express();

// Origen del cliente permitido (dinámico mediante variable de entorno)
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

// 1. Middleware CORS para peticiones desde el frontend
app.use(cors({
  origin: CLIENT_URL,
  credentials: true,
}));

app.use(morgan("dev"));
app.use(express.json());

// 2. Cabeceras adicionales para asegurar compatibilidad CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", CLIENT_URL);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// 3. Rutas principales
app.use(mainRouter);

// 4. Manejo centralizado de errores
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = app;
