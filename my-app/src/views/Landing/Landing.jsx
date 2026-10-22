// Landing.js
import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

const Landing = () => {
  return (
    <div className="Landing">
      <h1>SUZ</h1>

      <div className="button">
        <Link to="/Interior" className="btn-landing">
          INTERIOR
        </Link>
        <Link to="/Corrientes" className="btn-landing">
          CORRIENTES
        </Link>
        <Link to="/Chaco" className="btn-landing">
          CHACO
        </Link>
      </div>
    </div>
  );
};

export default Landing;