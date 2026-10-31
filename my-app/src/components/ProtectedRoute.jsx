// ==============================================================
// 🛡️ COMPONENTE DE RUTA PROTEGIDA (SUZ CRM)
// ==============================================================
// Protege las pantallas del sistema para que:
// 1. Un usuario sin iniciar sesión no pueda entrar por URL (va directo a /login).
// 2. Un vendedor solo pueda ver su provincia asignada.
// 3. El Admin tenga acceso irrestricto a todas las pantallas.
// 4. Si la ruta no exige un rol exclusivo, cualquier usuario autenticado puede entrar.

import React from "react";
import { Route, Redirect } from "react-router-dom";
import { obtenerUsuarioActual } from "../utils/auth";

const ProtectedRoute = ({
  component: Component,
  render,
  rolPermitido,
  ...restoDeProps
}) => {
  return (
    <Route
      {...restoDeProps}
      render={(props) => {
        // Obtenemos los datos del usuario guardados en el navegador
        const usuario = obtenerUsuarioActual();

        // 1. Verificación de Autenticación:
        // Si no hay usuario logueado, lo mandamos directo al Login
        if (!usuario) {
          return <Redirect to="/login" />;
        }

        // 2. Verificación de Permisos (Autorización):
        // Si el usuario es 'admin', tiene pase libre a cualquier pantalla
        if (usuario.rol === "admin") {
          return Component ? <Component {...props} /> : render(props);
        }

        // Si la ruta no exige un rol específico, cualquier usuario autenticado puede ingresar
        if (!rolPermitido) {
          return Component ? <Component {...props} /> : render(props);
        }

        // Si el rol del usuario coincide con el rol permitido de la pantalla (ej: 'chaco' en /Chaco)
        if (usuario.rol === rolPermitido) {
          return Component ? <Component {...props} /> : render(props);
        }

        // 3. Redirección de Seguridad:
        // Si intenta entrar a un área ajena (ej: vendedor de Chaco intentando entrar a /corrientes),
        // el sistema lo redirige a la pantalla que le corresponde por su rol.
        const mapaRutas = {
          chaco: "/Chaco",
          corrientes: "/corrientes",
          interior: "/Interior",
        };

        const rutaSegura = mapaRutas[usuario.rol] || "/login";
        return <Redirect to={rutaSegura} />;
      }}
    />
  );
};

export default ProtectedRoute;
