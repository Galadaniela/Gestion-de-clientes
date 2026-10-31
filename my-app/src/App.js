// ==============================================================
// 🚀 ENRUTADOR PRINCIPAL DE LA APLICACIÓN (SUZ CRM)
// ==============================================================
import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { Landing, Form, Chaco, Corrientes, Interior, Login } from "./views/index.js";
import HeaderNav from "./components/HeaderNav/HeaderNav.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <div className="App">
      {/* 1. Barra de navegación superior con información de usuario y sesión */}
      <HeaderNav />

      {/* 2. Definición de rutas protegidas y públicas */}
      <Switch>
        {/* Ruta pública: Formulario de inicio de sesión */}
        <Route path="/login" exact component={Login} />

        {/* Pantalla de inicio general (selector de provincias): solo para Admin */}
        <ProtectedRoute path="/" exact component={Landing} rolPermitido="admin" />

        {/* Formulario para registrar nuevo cliente: cualquier usuario autenticado */}
        <ProtectedRoute path="/Form" component={Form} />

        {/* Área Chaco: exclusiva para Admin y vendedor de Chaco */}
        <ProtectedRoute
          path="/Chaco"
          render={() => <Chaco provincia="chaco" />}
          rolPermitido="chaco"
        />

        {/* Área Corrientes: exclusiva para Admin y vendedor de Corrientes */}
        <ProtectedRoute
          path={["/corrientes", "/Corrientes"]}
          render={() => <Corrientes provincia="corrientes" />}
          rolPermitido="corrientes"
        />

        {/* Área Interior: exclusiva para Admin y vendedor de Interior */}
        <ProtectedRoute
          path="/Interior"
          render={() => <Interior provincia="Interior" />}
          rolPermitido="interior"
        />
      </Switch>
    </div>
  );
}

export default App;
