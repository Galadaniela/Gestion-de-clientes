// AVANCE CRM: Formulario completo con Razón Social, Persona de Contacto,
// ciclo de reposición (Fecha Última Compra + Frecuencia habitual = Próxima compra estimada),
// bloque de productos y facturación en vivo.
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { postClientes } from "../../redux/actions";
import { useDispatch } from "react-redux";
import "./form.css";

const Form = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [input, setInput] = useState({
    name: "",          // Razón Social / Negocio
    contacto: "",      // Persona de contacto (encargado, dueño)
    fecha: new Date().toISOString().split("T")[0], // Fecha de última compra
    frecuencia: 7,     // Frecuencia habitual de compra en días
    provincia: "",
    localidad: "",
    direccion: "",
    calle: "",
    canal: "",
    telefono: "",
    producto: "",
    marca: "",
    cantidadKg: "",
    precioKg: "",
    monto: "",          // Monto Pagado
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  // 🧮 Cálculos automáticos en vivo durante el render:
  const montoTotalCalculado = Number(input.cantidadKg || 0) * Number(input.precioKg || 0);
  const montoPagadoNumero = Number(input.monto || 0);
  const deudaCalculada = Math.max(0, montoTotalCalculado - montoPagadoNumero);

  // Estimación de próxima compra:
  const diasFrecuencia = Number(input.frecuencia || 7);
  let proximaCompraEstimada = "-";
  if (input.fecha) {
    const partes = String(input.fecha).split("-");
    if (partes.length === 3) {
      const d = new Date(Number(partes[0]), Number(partes[1]) - 1, Number(partes[2]));
      d.setDate(d.getDate() + diasFrecuencia);
      proximaCompraEstimada = d.toLocaleDateString("es-AR");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const provinciaLower = input.provincia.toLowerCase();
    const provinciasValidas = ["corrientes", "chaco", "interior"];

    if (!provinciasValidas.includes(provinciaLower)) {
      alert("La provincia debe ser: corrientes, chaco o interior");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/clientes");
      const data = await response.json();

      const existeCliente = Array.isArray(data) && data.find(
        (cliente) =>
          cliente.name &&
          cliente.name.toLowerCase() === input.name.toLowerCase() &&
          cliente.provincia &&
          cliente.provincia.toLowerCase() === provinciaLower
      );

      if (existeCliente) {
        alert("El cliente ya existe en esta provincia");
        return;
      }

      const clienteAEnviar = {
        ...input,
        frecuencia: Number(input.frecuencia || 7),
        calle: input.calle === "" ? null : Number(input.calle),
        cantidadKg: input.cantidadKg === "" ? null : Number(input.cantidadKg),
        precioKg: input.precioKg === "" ? null : Number(input.precioKg),
        monto: montoPagadoNumero,
        deuda: deudaCalculada,
      };

      try {
        const res = await dispatch(postClientes(clienteAEnviar));
        if (!res) {
          alert("Modo demo: el cliente no se guardó en el backend");
        } else {
          alert("¡Cliente registrado exitosamente!");
        }
      } catch (dispatchErr) {
        alert("Modo demo: el cliente no se guardó en el backend");
      }

      setInput({
        name: "",
        contacto: "",
        fecha: new Date().toISOString().split("T")[0],
        frecuencia: 7,
        provincia: "",
        localidad: "",
        direccion: "",
        calle: "",
        canal: "",
        telefono: "",
        producto: "",
        marca: "",
        cantidadKg: "",
        precioKg: "",
        monto: "",
      });

      const rutas = {
        corrientes: "/corrientes",
        chaco: "/Chaco",
        interior: "/Interior",
      };
      history.push(rutas[provinciaLower]);
    } catch (error) {
      console.log("Error:", error);
      alert("Hubo un problema al crear el cliente");
    }
  };

  return (
    <div className="form-container">
      <div className="btn-back">
        <Link to="/" className="btn-link">
          ← VOLVER
        </Link>
      </div>

      <h1>Nuevo Cliente / Negocio</h1>

      <form onSubmit={handleSubmit} className="form-cliente">
        {/* 🏢 SECCIÓN: IDENTIFICACIÓN Y CONTACTO */}
        <h3 className="form-subtitulo">🏢 Identificación y Contacto</h3>

        <div className="form-group">
          <label htmlFor="name">Razón Social / Nombre del Negocio</label>
          <input
            type="text"
            className="input-group"
            placeholder="Ej: Panadería La Espiga S.R.L."
            value={input.name}
            name="name"
            id="name"
            required
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="contacto">Persona de Contacto</label>
          <input
            type="text"
            className="input-group"
            placeholder="Ej: Carlos Gómez (Dueño) / Mariana (Encargada)"
            value={input.contacto}
            name="contacto"
            id="contacto"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="telefono">Teléfono / WhatsApp</label>
          <input
            type="tel"
            className="input-group"
            placeholder="Ej: 3794123456"
            value={input.telefono}
            name="telefono"
            id="telefono"
            required
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="canal">Canal de Venta</label>
          <input
            type="text"
            className="input-group"
            placeholder="WhatsApp / Distribuidor / Local"
            value={input.canal}
            name="canal"
            id="canal"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="provincia">Provincia</label>
          <input
            type="text"
            className="input-group"
            placeholder="corrientes / chaco / interior"
            value={input.provincia}
            name="provincia"
            id="provincia"
            required
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="localidad">Localidad</label>
          <input
            type="text"
            className="input-group"
            placeholder="Ciudad o pueblo"
            value={input.localidad}
            name="localidad"
            id="localidad"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="direccion">Dirección</label>
          <input
            type="text"
            className="input-group"
            placeholder="Calle y altura"
            value={input.direccion}
            name="direccion"
            id="direccion"
            onChange={handleChange}
          />
        </div>

        {/* 📅 SECCIÓN: CICLO COMERCIAL Y REPOSICIÓN */}
        <h3 className="form-subtitulo">📅 Ciclo Comercial y Frecuencia de Compra</h3>

        <div className="form-group">
          <label htmlFor="fecha">Fecha de Última Compra</label>
          <input
            type="date"
            className="input-group"
            value={input.fecha}
            name="fecha"
            id="fecha"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="frecuencia">Frecuencia Habitual de Compra</label>
          <select
            className="input-group"
            value={input.frecuencia}
            name="frecuencia"
            id="frecuencia"
            onChange={handleChange}
          >
            <option value={7}>Semanal (cada 7 días)</option>
            <option value={15}>Quincenal (cada 15 días)</option>
            <option value={30}>Mensual (cada 30 días)</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="proximaCompra">Próxima Compra Estimada (Automática)</label>
          <input
            type="text"
            className="input-group"
            id="proximaCompra"
            value={`📅 Estimada: ${proximaCompraEstimada}`}
            readOnly
          />
        </div>

        {/* 📦 SECCIÓN: ÚLTIMO PEDIDO */}
        <h3 className="form-subtitulo">📦 Pedido de Mercadería</h3>

        <div className="form-group">
          <label htmlFor="producto">Producto</label>
          <select
            className="input-group"
            value={input.producto}
            name="producto"
            id="producto"
            onChange={handleChange}
          >
            <option value="">Seleccioná producto</option>
            <option value="harina">harina</option>
            <option value="azucar">azucar</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="marca">Marca</label>
          <input
            type="text"
            className="input-group"
            placeholder="Marca del producto"
            value={input.marca}
            name="marca"
            id="marca"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="cantidadKg">Cantidad (kg)</label>
          <input
            type="number"
            className="input-group"
            placeholder="0"
            value={input.cantidadKg}
            name="cantidadKg"
            id="cantidadKg"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="precioKg">Precio por kilo ($)</label>
          <input
            type="number"
            className="input-group"
            placeholder="0"
            value={input.precioKg}
            name="precioKg"
            id="precioKg"
            onChange={handleChange}
          />
        </div>

        {/* 💵 SECCIÓN: FACTURACIÓN Y CUENTA CORRIENTE */}
        <h3 className="form-subtitulo">💵 Facturación y Cuenta Corriente</h3>

        <div className="form-group">
          <label htmlFor="montoTotal">Monto Total</label>
          <input
            type="text"
            className="input-group"
            id="montoTotal"
            value={`$ ${montoTotalCalculado.toLocaleString("es-AR")}`}
            readOnly
          />
        </div>

        <div className="form-group">
          <label htmlFor="monto">Monto Pagado</label>
          <input
            type="number"
            className="input-group"
            placeholder="0"
            value={input.monto}
            name="monto"
            id="monto"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="deuda">Deuda (Lo que queda por pagar)</label>
          <input
            type="text"
            className="input-group"
            id="deuda"
            value={`$ ${deudaCalculada.toLocaleString("es-AR")}`}
            readOnly
          />
        </div>

        <button className="btn-form" type="submit">
          Ingresar Cliente
        </button>
      </form>
    </div>
  );
};

export default Form;
