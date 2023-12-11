import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateClientes } from "../../redux/actions";
import Card from "../../components/Card/Card";
import SearchBar from "../../components/SearchBar/SearchBar";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./Styles.css";

const Corrientes = ({ provincia }) => {
  const dispatch = useDispatch();
  const [provinciaData, setProvinciaData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [clienteConDeuda, setClienteConDeuda] = useState([]);
  const [clienteSinDeuda, setClienteSinDeuda] = useState([]);
  
  useEffect(() => {
    if (provincia) {
      const provinciaLowerCase = provincia.toLowerCase();
      axios.get("http://localhost:3001/clientes").then((response) => {
        const filteredData = response.data.filter(
          (item) => item.provincia.toLowerCase() === provinciaLowerCase
        );

        // Divide los clientes en categorías
        const clientesConDeuda = filteredData.filter((cliente) => cliente.deuda > 0);
        const clientesSinDeuda = filteredData.filter((cliente) => cliente.deuda === 0);

        setProvinciaData(filteredData);
        setClienteConDeuda(clientesConDeuda);
        setClienteSinDeuda(clientesSinDeuda);
      });
    }
  }, [provincia]);
  
  
  const handleUpdateCliente = (cliente) => {
    dispatch(updateClientes(cliente));
  };

  // const filteredData = provinciaData.filter((cliente) => {
  //   return (
  //     cliente.fecha.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     cliente.name.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  // });

  return (
    <div className="Corrientes">
      <h1>Clientes en Corrientes</h1>
      <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />

      <div className="Inicio">
        <button className="btn-Inicio">
          <Link to="/" className="In">
          Inicio
        </Link>
        </button>    
      </div>
      
      <div className="Cliente">
  <button className="btn-cliente">
    <Link to="/Form"className="form">
      Crear Cliente
    </Link>
  </button>
</div>
      <table className="styled-table">
      <thead>
          <tr>
            <th>Fecha</th>
            <th>Nombre</th>
            <th>Provincia</th>
            <th>Localidad</th>
            <th>Dirección</th>
            <th>Monto</th>
            <th>Deuda</th>
            <th>Canal</th>
            <th>Telefono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <h2>Clientes con Deuda</h2>
          {clienteConDeuda.map((cliente) => (
            <Card
              key={cliente.id}
              cliente={cliente}
              handleUpdateCliente={handleUpdateCliente}
            />
          ))}
          <h2>Clientes sin Deuda</h2>
          {clienteSinDeuda.map((cliente) => (
            <Card
              key={cliente.id}
              cliente={cliente}
              handleUpdateCliente={handleUpdateCliente}
            />
          ))}
          {provinciaData
            .filter((cliente) =>
              cliente.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((cliente) => (
              <Card
                key={cliente.id}
                cliente={cliente}
                handleUpdateCliente={handleUpdateCliente}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Corrientes;
