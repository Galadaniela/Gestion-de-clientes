// ==============================================================
// 🌐 CONFIGURACIÓN DE EXPRESS Y CORS (SUZ CRM)
// ==============================================================
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mainRouter = require("./routes/Index");

const app = express();

// Lista de orígenes frontend permitidos (local y producción en Vercel)
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://gestion-de-clientes-nine.vercel.app",
];

// 1. Middleware CORS dinámico para peticiones desde el frontend
app.use(
  cors({
    origin: (origin, callback) => {
      // Permite peticiones sin origin (como apps, curl, Postman o scripts backend)
      if (!origin) return callback(null, true);
      // Permite localhost, la URL de Vercel oficial y cualquier preview deploy de vercel.app
      if (
        allowedOrigins.includes(origin) ||
        origin.endsWith(".vercel.app") ||
        process.env.CLIENT_URL === "*"
      ) {
        return callback(null, origin);
      }
      return callback(null, origin);
    },
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json());

// 2. Cabeceras adicionales para compatibilidad CORS total en todos los navegadores
app.use((req, res, next) => {
  const requestOrigin = req.headers.origin;
  if (requestOrigin) {
    res.header("Access-Control-Allow-Origin", requestOrigin);
  } else if (process.env.CLIENT_URL && process.env.CLIENT_URL !== "*") {
    res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  } else {
    res.header("Access-Control-Allow-Origin", "*");
  }
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE, PATCH");

  // Responder de inmediato a peticiones preflight de navegadores
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
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
