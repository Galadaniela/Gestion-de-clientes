// ==============================================================
// 🧭 BARRA DE NAVEGACIÓN SUPERIOR Y SESIÓN (SUZ CRM)
// ==============================================================
import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { obtenerUsuarioActual, cerrarSesion } from "../../utils/auth";
import "./HeaderNav.css";

const HeaderNav = () => {
  const history = useHistory();
  const location = useLocation();
  const usuario = obtenerUsuarioActual();

  // Si estamos en la pantalla de login o no hay usuario, no mostramos la barra
  if (location.pathname === "/login" || !usuario) {
    return null;
  }

  const handleLogout = () => {
    cerrarSesion();
    history.push("/login");
  };

  const esAdmin = usuario.rol === "admin";

  // Ruta principal según el rol del usuario conectado
  const getRutaInicio = () => {
    if (usuario.rol === "admin") return "/";
    if (usuario.rol === "chaco") return "/Chaco";
    if (usuario.rol === "corrientes") return "/corrientes";
    if (usuario.rol === "interior") return "/Interior";
    return "/login";
  };

  return (
    <header className="header-nav">
      <div className="header-nav-container">
        {/* Logo / Inicio */}
        <div className="header-nav-brand">
          <Link to={getRutaInicio()} className="brand-logo">
            SUZ <span>CRM</span>
          </Link>
          <span className="user-area-badge">
            {esAdmin ? "👑 Administración" : `📍 ${usuario.area}`}
          </span>
        </div>

        {/* Enlaces de navegación (Solo para Admin puede cambiar entre todas las áreas) */}
        {esAdmin && (
          <nav className="header-nav-links">
            <Link
              to="/Chaco"
              className={`nav-link ${location.pathname === "/Chaco" ? "active" : ""}`}
            >
              Chaco
            </Link>
            <Link
              to="/corrientes"
              className={`nav-link ${location.pathname === "/corrientes" || location.pathname === "/Corrientes" ? "active" : ""}`}
            >
              Corrientes
            </Link>
            <Link
              to="/Interior"
              className={`nav-link ${location.pathname === "/Interior" ? "active" : ""}`}
            >
              Interior de Chaco
            </Link>
            <Link
              to="/Form"
              className={`nav-link nav-link-btn ${location.pathname === "/Form" ? "active" : ""}`}
            >
              + Nuevo Cliente
            </Link>
          </nav>
        )}

        {/* Perfil del usuario conectado y botón Cerrar Sesión */}
        <div className="header-nav-user">
          <span className="user-name">👤 {usuario.nombre}</span>
          <button type="button" className="btn-logout" onClick={handleLogout}>
            Cerrar Sesión 🚪
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderNav;
