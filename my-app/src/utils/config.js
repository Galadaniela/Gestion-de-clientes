// ==============================================================
// ⚙️ CONFIGURACIÓN GLOBAL DE LA APLICACIÓN (SUZ CRM)
// ==============================================================
// Centraliza la URL base de la API REST para que todo el frontend
// consuma la misma dirección, facilitando el paso a producción.

export const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:3001";
