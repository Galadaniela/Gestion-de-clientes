// ==============================================================
// 🌟 PORTADA DE ACCESO GENERAL (SUZ CRM)
// ==============================================================
import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

const Landing = () => {
  return (
    <div className="Landing">
      <h1>SUZ</h1>

      <div className="button">
        <Link to="/Chaco" className="btn-landing">
          CHACO (RESISTENCIA)
        </Link>
        <Link to="/Corrientes" className="btn-landing">
          CORRIENTES
        </Link>
        <Link to="/Interior" className="btn-landing">
          INTERIOR DE CHACO
        </Link>
      </div>
    </div>
  );
};

export default Landing;
