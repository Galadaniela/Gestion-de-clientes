
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteClientes } from "../../redux/actions";
import "../../views/Home/Styles.css"; // Asegúrate de importar el archivo CSS
import axios from "axios";

const Card = ({ cliente, handleUpdateCliente }) => {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [editedCliente, setEditedCliente] = useState({ ...cliente });
  const [provinciaData, setProvinciaData] = useState([]);
  const [clienteConDeuda, setClienteConDeuda] = useState([]);
  const [clienteSinDeuda, setClienteSinDeuda] = useState([]);
  const [clientes , setClientes] = useState([]);
  
  const handleEdit = () => {
    setEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCliente((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


   
  const handleSave = () => {
    handleUpdateCliente(editedCliente);
    setEditing(false);
    const agregarCliente = (nuevoCliente) => {
      // Verifica si el nuevo cliente tiene deuda
      const tieneDeuda = nuevoCliente.deuda > 0;
    
      // Agrega el nuevo cliente al principio o al final de la lista
      const updatedClientes = tieneDeuda
        ? [nuevoCliente, ...clientes]
        : [...clientes, nuevoCliente];
    
      // Actualiza el estado con la nueva lista
      setClientes(updatedClientes);
    };
    
    axios
      .put(`http://localhost:3001/clientes/${editedCliente.id}`, editedCliente)
      .then((response) => {
        setProvinciaData((prevState) =>
          prevState.map((item) => (item.id === editedCliente.id ? response.data : item))
        );
        // Agrega una alerta para mostrar la información actualizada
        alert("Información actualizada");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error al guardar la edición del cliente:", error);
      });
    console.log("Datos del cliente que se actualizarán:", editedCliente);
  };
  
  const handlePayDebt = (clienteId) => {
    axios
      .put(`http://localhost:3001/clientes/${cliente.id}`, {
        ...cliente,
        saldado: true, // Marcar la deuda como saldada
        deuda: 0,
      })
      .then((response) => {
        handleUpdateCliente({ ...cliente, saldado: true, deuda: 0 });
  
        // Mueve al cliente de la sección "con deuda" a la sección "sin deuda"
        const updatedClientesConDeuda = clienteConDeuda.filter((c) => c.id !== clienteId);
        setClienteConDeuda(updatedClientesConDeuda);
        setClienteSinDeuda([cliente, ...clienteSinDeuda]);

  
        // Clasificar los clientes nuevamente en la sección "sin deuda"
        const sortedClientes = clienteSinDeuda.sort((a, b) => {
          if (a.deuda && !b.deuda) return -1;
          if (!a.deuda && b.deuda) return 1;
          return 0;
        });
  
        // Actualizar el estado con la nueva clasificación
        setClienteSinDeuda(sortedClientes);
      })
      .catch((error) => {
        console.error("Error al marcar la deuda como saldada:", error);
      });
  };
  
  const handleDelete = () => {
    const confirmarEliminar = window.confirm("¿Estás seguro de eliminar a este cliente?");
  
    if (confirmarEliminar) {
      axios
        .delete(`http://localhost:3001/clientes/${cliente.id}`)
        .then(() => {
          dispatch(deleteClientes(cliente.id));
          alert("Cliente eliminado exitosamente");

          window.location.reload();
        })
         
        .catch((error) => {
          console.error("Error al eliminar el cliente:", error);
        });
    }
  };
  
  return (
    <tr>
      <td>{cliente.fecha}</td>
      <td>{cliente.name}</td>
      <td>{cliente.provincia}</td>
      <td>{cliente.localidad}</td>
      <td>{cliente.direccion} {cliente.calle}</td>
      <td>{cliente.monto}</td>
      <td>
      <span id={`deuda-${cliente.id}`}>{cliente.deuda}</span>
      <button className="PayDebt" onClick={() => { handlePayDebt(cliente.id); handleSave(); }}>Pagar Deuda</button>

      </td>
      <td>{cliente.canal}</td>
      <td>{cliente.telefono}</td>
      <td>
        {editing ? (
          <div>
             <input
              type="date"
              name="fecha"
              value={editedCliente.fecha}
              onChange={handleChange}
            />
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              value={editedCliente.name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="provincia"
              placeholder="Provincia"
              value={editedCliente.provincia}
              onChange={handleChange}
            />
            <input
              type="text"
              name="localidad"
              placeholder="Localidad"
              value={editedCliente.localidad}
              onChange={handleChange}
            />
            <input
              type="text"
              name="direccion"
              placeholder="Direccion"
              value={editedCliente.direccion}
              onChange={handleChange}
            />
            <input
              type="number"
              name="calle"
              placeholder="Calle"
              value={editedCliente.calle}
              onChange={handleChange}
            />
            <input
              type="number"
              name="monto"
              placeholder="Monto"
              value={editedCliente.monto}
              onChange={handleChange}
            />
            <input
              type="number"
              name="deuda"
              placeholder="Deuda"
              value={editedCliente.deuda}
              onChange={handleChange}
            />
             <input
              type="text"
              name="canal"
              placeholder="canal"
              value={editedCliente.canal}
              onChange={handleChange}
            />
            <input
              type="tel"
              name="telefono"
              placeholder="telefono"
              value={editedCliente.telefono}
              onChange={handleChange}
            />
                   <button className="Guardar" onClick={handleSave}>
              Guardar
            </button>
          </div>
        ) : (
          <div className="buttons">
            <div>
              <button className="Edit" onClick={handleEdit}>
                Editar
              </button>
            </div>
            <button className="Delete" onClick={handleDelete}>
              Eliminar
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default Card;
