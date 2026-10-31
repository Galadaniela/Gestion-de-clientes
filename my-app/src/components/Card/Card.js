// AVANCE CRM: Tarjetas inteligentes de clientes con ciclo comercial,
// semáforo de reposición (Última compra + Frecuencia = Próxima compra),
// desglose de productos y cuenta corriente con botón directo de WhatsApp.

import React, { useState } from "react";
import { useToast } from "../../context/ToastContext";

export const calcularCicloComercial = (fechaUltima, diasFrecuencia = 7) => {
  if (!fechaUltima) {
    return {
      fechaProxStr: "Sin definir",
      diffDias: null,
      estado: "sin-fecha",
      badgeClase: "badge-semaforo-gris",
      badgeTexto: "⚪ Sin fecha",
    };
  }

  const dias = Number(diasFrecuencia) || 7;
  const partes = String(fechaUltima).slice(0, 10).split("-");
  const ultima = partes.length === 3
    ? new Date(Number(partes[0]), Number(partes[1]) - 1, Number(partes[2]))
    : new Date(fechaUltima);

  const proxima = new Date(ultima);
  proxima.setDate(proxima.getDate() + dias);

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  const proxNormalizada = new Date(proxima);
  proxNormalizada.setHours(0, 0, 0, 0);

  const diffTiempo = proxNormalizada.getTime() - hoy.getTime();
  const diffDias = Math.round(diffTiempo / (1000 * 60 * 60 * 24));
  const fechaProxStr = proxima.toLocaleDateString("es-AR");

  if (diffDias < 0) {
    const atraso = Math.abs(diffDias);
    return {
      fechaProxStr,
      diffDias,
      estado: "vencido",
      badgeClase: "badge-semaforo-rojo",
      badgeTexto: `🔴 Vencido (${atraso} d${atraso === 1 ? "ía" : "ías"} atrasado)`,
    };
  } else if (diffDias === 0) {
    return {
      fechaProxStr,
      diffDias,
      estado: "hoy",
      badgeClase: "badge-semaforo-amarillo",
      badgeTexto: "🟡 ¡Toca comprar HOY!",
    };
  } else if (diffDias <= 2) {
    return {
      fechaProxStr,
      diffDias,
      estado: "proximo",
      badgeClase: "badge-semaforo-amarillo",
      badgeTexto: `🟡 Compra en ${diffDias} d${diffDias === 1 ? "ía" : "ías"}`,
    };
  } else {
    return {
      fechaProxStr,
      diffDias,
      estado: "en-fecha",
      badgeClase: "badge-semaforo-verde",
      badgeTexto: `🟢 En fecha (${diffDias} días restantes)`,
    };
  }
};

const Card = ({
  cliente,
  handleUpdateCliente,
  handleDeleteCliente,
  handleEditCliente,
}) => {
  const { showToast } = useToast();
  const [editando, setEditando] = useState(false);
  const [datosEditados, setDatosEditados] = useState(null);

  const iniciarEdicion = () => {
    setDatosEditados({
      fecha: cliente.fecha ? String(cliente.fecha).slice(0, 10) : "",
      name: cliente.name || "",
      contacto: cliente.contacto || "",
      frecuencia: cliente.frecuencia || 7,
      provincia: cliente.provincia || "",
      localidad: cliente.localidad || "",
      direccion: cliente.direccion || "",
      calle: cliente.calle ?? "",
      canal: cliente.canal || "",
      telefono: cliente.telefono || "",
      producto: cliente.producto || "",
      marca: cliente.marca || "",
      cantidadKg: cliente.cantidadKg ?? "",
      precioKg: cliente.precioKg ?? "",
      monto: cliente.monto ?? "",
    });
    setEditando(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDatosEditados((prev) => ({ ...prev, [name]: value }));
  };

  // Cálculos en vivo para modo edición:
  const montoTotalEditado = Number(datosEditados?.cantidadKg || 0) * Number(datosEditados?.precioKg || 0);
  const montoPagadoEditado = Number(datosEditados?.monto || 0);
  const deudaEditada = Math.max(0, montoTotalEditado - montoPagadoEditado);

  const guardarEdicion = () => {
    const totalCalc = Number(datosEditados.cantidadKg || 0) * Number(datosEditados.precioKg || 0);
    const pagado = Number(datosEditados.monto || 0);
    const deudaCalc = Math.max(0, totalCalc - pagado);

    const clienteEditado = {
      ...cliente,
      ...datosEditados,
      frecuencia: Number(datosEditados.frecuencia || 7),
      calle: datosEditados.calle === "" ? null : Number(datosEditados.calle),
      cantidadKg: datosEditados.cantidadKg === "" ? null : Number(datosEditados.cantidadKg),
      precioKg: datosEditados.precioKg === "" ? null : Number(datosEditados.precioKg),
      monto: pagado,
      deuda: deudaCalc,
    };
    handleEditCliente(clienteEditado);
    setEditando(false);
    showToast(`¡Cliente ${clienteEditado.name} actualizado!`, "success");
  };

  // 📅 Datos y cálculos para modo lectura:
  const fechaUltimaCompra = cliente.fecha ? new Date(cliente.fecha).toLocaleDateString("es-AR") : "Sin fecha";
  const ciclo = calcularCicloComercial(cliente.fecha, cliente.frecuencia || 7);

  const montoTotalNumero =
    (Number(cliente.cantidadKg || 0) * Number(cliente.precioKg || 0)) ||
    (Number(cliente.monto || 0) + Number(cliente.deuda || 0));

  const montoPagadoNumero = Number(cliente.monto || 0);
  const deudaNumero = cliente.deuda !== undefined && cliente.deuda !== null && cliente.deuda !== ""
    ? Number(cliente.deuda)
    : Math.max(0, montoTotalNumero - montoPagadoNumero);

  const precioKgFormateado = Number(cliente.precioKg || 0).toLocaleString("es-AR");
  const montoTotalFormateado = montoTotalNumero.toLocaleString("es-AR");
  const montoPagadoFormateado = montoPagadoNumero.toLocaleString("es-AR");
  const deudaFormateada = deudaNumero.toLocaleString("es-AR");

  // 📲 Enlace de WhatsApp directo con mensaje prefabricado
  const telNumeros = String(cliente.telefono || "").replace(/\D/g, "");
  const telWhatsapp = telNumeros.startsWith("54") ? telNumeros : `549${telNumeros}`;
  const textoWhatsapp = encodeURIComponent(
    `Hola ${cliente.contacto || cliente.name}, te escribimos de Gestión de Clientes para coordinar la reposición de ${cliente.producto || "mercadería"}. ¡Saludos!`
  );
  const linkWhatsapp = `https://wa.me/${telWhatsapp}?text=${textoWhatsapp}`;

  return (
    <div className={`crm-card ${deudaNumero > 0 ? "crm-card-deuda" : "crm-card-aldia"}`}>
      {editando ? (
        
        <div className="crm-card-edit-form">
          <div className="crm-edit-header">
            <h4>✏️ Editando: {cliente.name}</h4>
          </div>

          <div className="crm-edit-grid">
            <div className="edit-field">
              <label>Razón Social / Negocio</label>
              <input name="name" value={datosEditados.name} onChange={handleChange} />
            </div>

            <div className="edit-field">
              <label>Contacto (Persona)</label>
              <input name="contacto" placeholder="Nombre del encargado" value={datosEditados.contacto} onChange={handleChange} />
            </div>

            <div className="edit-field">
              <label>Teléfono</label>
              <input name="telefono" type="tel" value={datosEditados.telefono} onChange={handleChange} />
            </div>

            <div className="edit-field">
              <label>Frecuencia de compra</label>
              <select name="frecuencia" value={datosEditados.frecuencia} onChange={handleChange}>
                <option value={7}>Semanal (cada 7 días)</option>
                <option value={15}>Quincenal (cada 15 días)</option>
                <option value={30}>Mensual (cada 30 días)</option>
              </select>
            </div>

            <div className="edit-field">
              <label>Fecha Última Compra</label>
              <input name="fecha" type="date" value={datosEditados.fecha} onChange={handleChange} />
            </div>

            <div className="edit-field">
              <label>Localidad</label>
              <input name="localidad" value={datosEditados.localidad} onChange={handleChange} />
            </div>

            <div className="edit-field">
              <label>Dirección</label>
              <input name="direccion" value={datosEditados.direccion} onChange={handleChange} />
            </div>

            <div className="edit-field">
              <label>Canal de Venta</label>
              <input name="canal" value={datosEditados.canal} onChange={handleChange} />
            </div>

            <div className="edit-field">
              <label>Producto</label>
              <select name="producto" value={datosEditados.producto} onChange={handleChange}>
                <option value="">Seleccioná producto</option>
                <option value="harina">harina</option>
                <option value="azucar">azucar</option>
              </select>
            </div>

            <div className="edit-field">
              <label>Marca</label>
              <input name="marca" value={datosEditados.marca} onChange={handleChange} />
            </div>

            <div className="edit-field">
              <label>Cantidad (kg)</label>
              <input name="cantidadKg" type="number" value={datosEditados.cantidadKg} onChange={handleChange} />
            </div>

            <div className="edit-field">
              <label>Precio por kg ($)</label>
              <input name="precioKg" type="number" value={datosEditados.precioKg} onChange={handleChange} />
            </div>

            <div className="edit-field">
              <label>Monto Pagado ($)</label>
              <input name="monto" type="number" value={datosEditados.monto} onChange={handleChange} />
            </div>

            <div className="edit-field-highlight">
              <span>Total: <strong>${montoTotalEditado.toLocaleString("es-AR")}</strong></span>
              <span>Deuda: <strong className={deudaEditada > 0 ? "txt-rojo" : "txt-verde"}>${deudaEditada.toLocaleString("es-AR")}</strong></span>
            </div>
          </div>

          <div className="crm-card-actions">
            <button type="button" className="btn-crm btn-guardar" onClick={guardarEdicion}>
              💾 Guardar Cambios
            </button>
            <button type="button" className="btn-crm btn-cancelar" onClick={() => setEditando(false)}>
              ✖ Cancelar
            </button>
          </div>
        </div>
      ) : (
        
        <>
          {/* 1. CABECERA: Razón Social, Contacto y Semáforo de Compra */}
          <div className="crm-card-header">
            <div className="crm-identidad">
              <h3 className="crm-razon-social">{cliente.name}</h3>
              <div className="crm-subtitulo">
                {cliente.contacto && <span className="crm-contacto">👤 {cliente.contacto}</span>}
                <span className="crm-ciudad">📍 {cliente.localidad || cliente.provincia}</span>
                {cliente.canal && <span className="crm-canal-pill">{cliente.canal}</span>}
              </div>
            </div>
            <div className="crm-semaforo-box">
              <span className={`badge-semaforo ${ciclo.badgeClase}`}>
                {ciclo.badgeTexto}
              </span>
            </div>
          </div>

          {/* 2. CUERPO: Cuadrícula con Ciclo, Pedido y Finanzas */}
          <div className="crm-card-body">
            {/* Bloque Ciclo Comercial */}
            <div className="crm-seccion-info">
              <span className="crm-seccion-titulo">📅 Ciclo Comercial</span>
              <div className="crm-dato-fila">
                <span className="lbl">Última compra:</span>
                <span className="val">{fechaUltimaCompra}</span>
              </div>
              <div className="crm-dato-fila">
                <span className="lbl">Frecuencia:</span>
                <span className="val">Cada {cliente.frecuencia || 7} días</span>
              </div>
              <div className="crm-dato-fila crm-proxima-destacada">
                <span className="lbl">Próxima compra:</span>
                <span className="val-destacado">{ciclo.fechaProxStr}</span>
              </div>
            </div>

            {/* Bloque Último Pedido */}
            <div className="crm-seccion-info">
              <span className="crm-seccion-titulo">📦 Último Pedido</span>
              <div className="crm-dato-fila">
                <span className="lbl">Producto:</span>
                <span className="val">{cliente.producto || "Sin producto"} {cliente.marca ? `(${cliente.marca})` : ""}</span>
              </div>
              <div className="crm-dato-fila">
                <span className="lbl">Cantidad y Precio:</span>
                <span className="val">
                  {cliente.cantidadKg ? `${cliente.cantidadKg} kg` : "-"} {cliente.precioKg ? `× $${precioKgFormateado}` : ""}
                </span>
              </div>
              <div className="crm-dato-fila">
                <span className="lbl">Monto Total:</span>
                <span className="val"><strong>${montoTotalFormateado}</strong></span>
              </div>
            </div>

            {/* Bloque Cuenta Corriente */}
            <div className="crm-seccion-info crm-cuenta-box">
              <span className="crm-seccion-titulo">💰 Cuenta Corriente</span>
              <div className="crm-dato-fila">
                <span className="lbl">Pagado:</span>
                <span className="val-verde">${montoPagadoFormateado}</span>
              </div>
              <div className="crm-dato-fila">
                <span className="lbl">Deuda pendiente:</span>
                <span className={deudaNumero > 0 ? "val-rojo" : "val-verde"}>
                  ${deudaFormateada}
                </span>
              </div>
              <div className="crm-dato-fila">
                <span className="lbl">Dirección:</span>
                <span className="val crm-direccion-trunc" title={cliente.direccion}>
                  {cliente.direccion || "Sin dirección"}
                </span>
              </div>
            </div>
          </div>

          {/* 3. PIE: Botonera de acciones rápidas */}
          <div className="crm-card-footer">
            <div className="crm-acciones-izq">
              {cliente.telefono && (
                <a
                  href={linkWhatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-crm btn-whatsapp"
                  title="Abrir WhatsApp con mensaje prearmado"
                >
                  💬 WhatsApp
                </a>
              )}

              {!editando && deudaNumero > 0 && (
                <button
                  type="button"
                  className="btn-crm btn-saldar"
                  onClick={() => {
                    if (window.confirm(`¿Saldar la deuda total de $${deudaFormateada} de ${cliente.name}?`)) {
                      handleUpdateCliente({
                        ...cliente,
                        monto: montoTotalNumero,
                        deuda: 0,
                      });
                      showToast(`¡Deuda de ${cliente.name} saldada exitosamente!`, "success");
                    }
                  }}
                >
                  💵 Saldar
                </button>
              )}
            </div>

            <div className="crm-acciones-der">
              <button type="button" className="btn-crm btn-editar" onClick={iniciarEdicion}>
                ✏️ Editar
              </button>
              <button
                type="button"
                className="btn-crm btn-eliminar"
                onClick={() => {
                  if (window.confirm(`¿Eliminar a ${cliente.name}?`)) {
                    handleDeleteCliente && handleDeleteCliente(cliente);
                    showToast(`Cliente ${cliente.name} eliminado`, "info");
                  }
                }}
              >
                🗑️
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
