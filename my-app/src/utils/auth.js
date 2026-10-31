// ==============================================================
// 🔐 UTILIDADES DE AUTENTICACIÓN Y ROLES (SUZ CRM)
// ==============================================================
// Código simple y directo para gestionar sesiones en el Frontend.
// Guarda el usuario activo en localStorage del navegador.

// 1. Lista de usuarios autorizados con sus respectivas áreas y permisos
export const USUARIOS_VALIDOS = [
  {
    username: "admin",
    password: "123",
    rol: "admin",
    nombre: "Administrador General",
    area: "Todas las áreas",
  },
  {
    username: "chaco",
    password: "123",
    rol: "chaco",
    nombre: "Vendedor Chaco",
    area: "Chaco",
  },
  {
    username: "corrientes",
    password: "123",
    rol: "corrientes",
    nombre: "Vendedor Corrientes",
    area: "Corrientes",
  },
  {
    username: "interior",
    password: "123",
    rol: "interior",
    nombre: "Vendedor Interior Chaco",
    area: "Interior de Chaco",
  },
];

// 2. Iniciar sesión: verifica usuario y contraseña
export const autenticarUsuario = (username, password) => {
  const userEncontrado = USUARIOS_VALIDOS.find(
    (u) =>
      u.username.toLowerCase() === username.trim().toLowerCase() &&
      u.password === password
  );

  if (userEncontrado) {
    // Guardamos la sesión en el navegador
    localStorage.setItem("suz_usuario", JSON.stringify(userEncontrado));
    return { exito: true, usuario: userEncontrado };
  }

  return { exito: false, mensaje: "Usuario o contraseña incorrectos" };
};

// 3. Obtener el usuario conectado actualmente
export const obtenerUsuarioActual = () => {
  try {
    const sesion = localStorage.getItem("suz_usuario");
    return sesion ? JSON.parse(sesion) : null;
  } catch (error) {
    return null;
  }
};

// 4. Cerrar sesión: limpia el navegador
export const cerrarSesion = () => {
  localStorage.removeItem("suz_usuario");
};
