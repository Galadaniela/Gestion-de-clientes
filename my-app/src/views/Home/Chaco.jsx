import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateClientes, deleteClientes } from "../../redux/actions";
import Card from "../../components/Card/Card";
import SearchBar from "../../components/SearchBar/SearchBar";
import { Link } from "react-router-dom";
import "./Styles.css";

const Chaco = ({ provincia }) => {
  const dispatch = useDispatch();
  const [clientes, setClientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!provincia) return;

    axios
      .get("http://localhost:3001/clientes")
      .then((response) => {
        const data = Array.isArray(response.data) ? response.data : [];
        const filtrados = data.filter(
          (item) =>
            item.provincia &&
            item.provincia.toLowerCase() === provincia.toLowerCase()
        );
        setClientes(filtrados);
      })
      .catch((error) => console.log("❌ Error al traer clientes:", error));
  }, [provincia]);

  // Actualizar (saldar deuda o guardar cambios)
  const handleUpdateCliente = (cliente) => {
    dispatch(updateClientes(cliente));
    setClientes((prev) =>
      prev.map((c) => (c.id === cliente.id ? { ...c, deuda: 0 } : c))
    );
  };

  // Eliminar
  const handleDeleteCliente = (cliente) => {
    dispatch(deleteClientes(cliente.id));
    setClientes((prev) => prev.filter((c) => c.id !== cliente.id));
  };

  const handleEditCliente = (clienteEditado) => {
    dispatch(updateClientes(clienteEditado));
    setClientes((prev) =>
      prev.map((cliente) =>
        cliente.id === clienteEditado.id ? clienteEditado : cliente
      )
    );
  };

  const clientesFiltrados = clientes.filter((cliente) => {
    const texto = `${cliente.name || ""} ${cliente.contacto || ""} ${cliente.localidad || ""}`.toLowerCase();
    return texto.includes(searchTerm.toLowerCase());
  });

  const conDeuda = clientesFiltrados.filter((c) => Number(c.deuda) > 0);
  const sinDeuda = clientesFiltrados.filter((c) => Number(c.deuda) === 0);

  const filasConDeuda = conDeuda.map((cliente) => (
    <Card
      key={cliente.id}
      cliente={cliente}
      handleUpdateCliente={handleUpdateCliente}
      handleDeleteCliente={handleDeleteCliente}
      handleEditCliente={handleEditCliente}
    />
  ));

  const filasSinDeuda = sinDeuda.map((cliente) => (
    <Card
      key={cliente.id}
      cliente={cliente}
      handleUpdateCliente={handleUpdateCliente}
      handleDeleteCliente={handleDeleteCliente}
      handleEditCliente={handleEditCliente}
    />
  ));

  return (
    <div className="Interior">
      <h1>Clientes en Chaco</h1>

      <div className="barra-superior">
        <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />

        <div className="acciones-superior">
          <Link to="/" className="btn btn-secundario">
            ← Inicio
          </Link>
          <Link to="/Form" className="btn btn-primario">
            + Crear Cliente
          </Link>
        </div>
      </div>

      {/* 🔴 SECCIÓN: CLIENTES CON DEUDA */}
      <div className="crm-seccion-bloque">
        <div className="crm-seccion-header">
          <span className="badge badge-rojo">
            Con Deuda Pendiente ({conDeuda.length})
          </span>
        </div>

        {conDeuda.length === 0 ? (
          <div className="crm-vacio">
            <p>✅ ¡Excelente! No hay clientes con deuda en Chaco.</p>
          </div>
        ) : (
          <div className="crm-cards-grid">
            {filasConDeuda}
          </div>
        )}
      </div>

      {/* 🟢 SECCIÓN: CLIENTES AL DÍA */}
      <div className="crm-seccion-bloque">
        <div className="crm-seccion-header">
          <span className="badge badge-verde">
            Clientes al Día ({sinDeuda.length})
          </span>
        </div>

        {sinDeuda.length === 0 ? (
          <div className="crm-vacio">
            <p>No hay clientes registrados sin deuda.</p>
          </div>
        ) : (
          <div className="crm-cards-grid">
            {filasSinDeuda}
          </div>
        )}
      </div>
    </div>
  );
};

export default Chaco;
