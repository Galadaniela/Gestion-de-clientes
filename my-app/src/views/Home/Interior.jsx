import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateClientes, deleteClientes } from "../../redux/actions";
import SearchBar from "../../components/SearchBar/SearchBar";
import Card from "../../components/Card/Card";
import { Link } from "react-router-dom";
import "./Styles.css";

const Interior = ({ provincia }) => {
  const dispatch = useDispatch();
  const [provinciaData, setProvinciaData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (provincia) {
      const provinciaLowerCase = provincia.toLowerCase();
      axios
        .get("http://localhost:3001/clientes")
        .then((response) => {
          const data = Array.isArray(response.data) ? response.data : [];
          const filteredData = data.filter(
            (item) => item.provincia && item.provincia.toLowerCase() === provinciaLowerCase
          );
          setProvinciaData(filteredData);
        })
        .catch((err) => console.error("Error al traer clientes:", err));
    }
  }, [provincia]);

  const handleUpdateCliente = (cliente) => {
    dispatch(updateClientes(cliente));
    setProvinciaData((prev) =>
      prev.map((c) => (c.id === cliente.id ? { ...c, deuda: 0 } : c))
    );
  };

  const handleDeleteCliente = (cliente) => {
    dispatch(deleteClientes(cliente.id));
    setProvinciaData((prev) => prev.filter((c) => c.id !== cliente.id));
  };

  const handleEditCliente = (clienteEditado) => {
    dispatch(updateClientes(clienteEditado));
    setProvinciaData((prev) =>
      prev.map((cliente) =>
        cliente.id === clienteEditado.id ? clienteEditado : cliente
      )
    );
  };

  // 🔍 Filtro por búsqueda
  const clientesFiltrados = provinciaData.filter((cliente) => {
    const texto = `${cliente.name || ""} ${cliente.contacto || ""} ${cliente.localidad || ""}`.toLowerCase();
    return texto.includes(searchTerm.toLowerCase());
  });

  const clienteConDeuda = clientesFiltrados.filter((c) => Number(c.deuda) > 0);
  const clienteSinDeuda = clientesFiltrados.filter((c) => Number(c.deuda) === 0);

  const renderSeccion = (titulo, clientes, colorBadge, textoVacio) => {
    return (
      <div className="crm-seccion-bloque">
        <div className="crm-seccion-header">
          <span className={`badge ${colorBadge}`}>
            {titulo} ({clientes.length})
          </span>
        </div>

        {clientes.length === 0 ? (
          <div className="crm-vacio">
            <p>{textoVacio}</p>
          </div>
        ) : (
          <div className="crm-cards-grid">
            {clientes.map((cliente) => (
              <Card
                key={cliente.id}
                cliente={cliente}
                handleUpdateCliente={handleUpdateCliente}
                handleDeleteCliente={handleDeleteCliente}
                handleEditCliente={handleEditCliente}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="Interior">
      <h1>Clientes en Interior - {provincia}</h1>

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

      {renderSeccion(
        "Con Deuda Pendiente",
        clienteConDeuda,
        "badge-rojo",
        "✅ ¡Excelente! No hay clientes con deuda en esta región."
      )}

      {renderSeccion(
        "Clientes al Día",
        clienteSinDeuda,
        "badge-verde",
        "No hay clientes registrados en esta categoría."
      )}
    </div>
  );
};

export default Interior;
