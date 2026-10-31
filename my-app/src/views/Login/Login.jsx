// ==============================================================
// 🔑 VISTA DE LOGIN (SUZ CRM)
// ==============================================================
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { autenticarUsuario } from "../../utils/auth";
import "./Login.css";

const Login = () => {
  const history = useHistory();

  // Estados locales para el formulario
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Manejo del envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validamos credenciales usando nuestra función simple en utils/auth.js
    const resultado = autenticarUsuario(username, password);

    if (resultado.exito) {
      const { rol } = resultado.usuario;

      // Redireccionamos según el área/rol asignado
      if (rol === "admin") {
        history.push("/"); // El admin va a la pantalla principal
      } else if (rol === "chaco") {
        history.push("/Chaco");
      } else if (rol === "corrientes") {
        history.push("/corrientes");
      } else if (rol === "interior") {
        history.push("/Interior");
      }
    } else {
      setError(resultado.mensaje);
    }
  };

  // Función para rellenar rápido en la demo haciendo clic en un rol
  const rellenarDemo = (userDemo) => {
    setUsername(userDemo);
    setPassword("123");
    setError("");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Logo y Encabezado */}
        <div className="login-header">
          <h1 className="login-logo">SUZ</h1>
          <p className="login-subtitle">Sistema Comercial & Gestión de Clientes</p>
          <span className="login-badge">Control de Acceso por Áreas</span>
        </div>

        {/* Mensaje de error si falla */}
        {error && <div className="login-error-msg">⚠️ {error}</div>}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-field">
            <label htmlFor="username">Usuario</label>
            <input
              id="username"
              type="text"
              placeholder="Ej: admin, chaco, corrientes, interior"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="login-field">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn-submit">
            Iniciar Sesión →
          </button>
        </form>

        {/* Accesos rápidos para la demo */}
        <div className="login-demo-box">
          <span className="demo-label">⚡ Accesos rápidos para demo (clave: 123):</span>
          <div className="demo-buttons">
            <button type="button" onClick={() => rellenarDemo("admin")}>
              👑 Admin
            </button>
            <button type="button" onClick={() => rellenarDemo("chaco")}>
              📍 Chaco
            </button>
            <button type="button" onClick={() => rellenarDemo("corrientes")}>
              📍 Corrientes
            </button>
            <button type="button" onClick={() => rellenarDemo("interior")}>
              📍 Interior de Chaco
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
