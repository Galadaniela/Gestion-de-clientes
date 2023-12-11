import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import"./Landing.css"
const Landing = () => {
    return (
       
        <div class="Landing">
        <h1>Inicio</h1>
        <div className="button">
        <Link to="/Interior">
        <button>INTERIOR</button>
       </Link>
       <Link to="/Corrientes">
        <button>CORRIENTES</button>
       </Link>
       <Link to="/Chaco">
        <button>CHACO</button>
       </Link>
       </div>
       </div>
        
    )
}

export default Landing;