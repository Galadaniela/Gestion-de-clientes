
import React, { useEffect, useState } from "react";
import axios from "axios";

const Interiorchaco = ({ province }) => {
  const [provinceData, setProvinceData] = useState([]);

  useEffect(() => {
    // Realiza una solicitud a la API para obtener todos los datos de la base de datos
    axios.get("http://localhost:3001/clientes").then((response) => {
      // Filtra los datos según la provincia especificada en el prop "province"
      const filteredData = response.data.filter((item) => item.province === province);
      setProvinceData(filteredData);
    });
  }, [province]);

  return (
    <div>
      {/* Mostrar información de los clientes del interior de Chaco */}
      {provinceData.map((cliente) => (
        <div key={cliente.id}>
          <h2>{cliente.name}</h2>
          <h2>{cliente.province}</h2>
          <h2>{cliente.localidad}</h2>
          <h2>{cliente.direccion}</h2>
          <h2>{cliente.calle}</h2>
          <h2>{cliente.kilogramos}</h2>
          <h2>{cliente.precio}</h2>
          <h2>{cliente.telefono}</h2>
          {/* Mostrar otros detalles específicos del cliente */}
        </div>
      ))}
    </div>
  );
};

export default Interiorchaco;
