const { Clientes } = require("../db.js");

// ==============================================================
// 1. OBTENER TODOS LOS CLIENTES
// ==============================================================
const clientesInfo = async () => {
  try {
    // Buscamos todos los clientes guardados en la base de datos
    const database = await Clientes.findAll();
    // Devolvemos solo los valores puros de cada fila
    return database.map((cliente) => ({ ...cliente.dataValues }));
  } catch (error) {
    console.error("Error al obtener la información de clientes:", error);
    throw error;
  }
};

// ==============================================================
// 2. CREAR UN NUEVO CLIENTE (POST)
// ==============================================================
const nuevoClientes = async (req, res) => {
  try {
    // Obtenemos los datos que envía el frontend en el cuerpo de la petición (req.body)
    const {
      name,
      contacto,
      provincia,
      localidad,
      direccion,
      calle,
      telefono,
      canal,
      fecha,
      frecuencia,
      producto,
      marca,
      cantidadKg,
      precioKg,
      monto,
      deuda,
    } = req.body;

    // Validación básica de números para evitar errores al guardar
    const montoFinal = monto ? Number(monto) : 0;
    const deudaFinal = deuda ? Number(deuda) : 0;
    const frecuenciaFinal = frecuencia ? Number(frecuencia) : 7;
    const cantidadKgFinal = cantidadKg ? Number(cantidadKg) : 0;
    const precioKgFinal = precioKg ? Number(precioKg) : 0;
    const calleFinal = calle !== undefined && calle !== "" ? Number(calle) : null;

    // Creamos el cliente en MySQL usando Sequelize
    const newClient = await Clientes.create({
      name,
      contacto: contacto || null,
      provincia,
      localidad,
      direccion,
      calle: calleFinal,
      telefono,
      canal,
      fecha,
      frecuencia: frecuenciaFinal,
      producto: producto || null,
      marca: marca || null,
      cantidadKg: cantidadKgFinal,
      precioKg: precioKgFinal,
      monto: montoFinal,
      deuda: deudaFinal,
    });

    // Respondemos con éxito al frontend
    res.status(200).json({
      message: "Cliente registrado exitosamente",
      cliente: newClient,
    });
  } catch (error) {
    console.error("❌ ERROR al crear cliente:", error);
    res.status(500).json({
      message: "Error al registrar cliente",
      error: error.message,
    });
  }
};

// ==============================================================
// 3. OBTENER UN CLIENTE POR SU ID (GET :id)
// ==============================================================
const clienteId = async (req, res) => {
  const { id } = req.params;
  try {
    const cliente = await Clientes.findOne({ where: { id } });
    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ==============================================================
// 4. ACTUALIZAR UN CLIENTE (PUT :id)
// ==============================================================
const updateClientes = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      contacto,
      provincia,
      localidad,
      direccion,
      calle,
      telefono,
      canal,
      fecha,
      frecuencia,
      producto,
      marca,
      cantidadKg,
      precioKg,
      monto,
      deuda,
      saldado,
    } = req.body;

    // Buscamos el cliente por su ID único (Primary Key)
    const cliente = await Clientes.findByPk(id);
    if (!cliente) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    // Actualizamos los campos recibidos (si no vienen, conservamos el valor actual)
    if (name !== undefined) cliente.name = name;
    if (contacto !== undefined) cliente.contacto = contacto;
    if (provincia !== undefined) cliente.provincia = provincia;
    if (localidad !== undefined) cliente.localidad = localidad;
    if (direccion !== undefined) cliente.direccion = direccion;
    if (calle !== undefined) cliente.calle = calle === "" ? null : Number(calle);
    if (telefono !== undefined) cliente.telefono = telefono;
    if (canal !== undefined) cliente.canal = canal;
    if (fecha !== undefined) cliente.fecha = fecha;
    if (frecuencia !== undefined) cliente.frecuencia = Number(frecuencia);
    if (producto !== undefined) cliente.producto = producto;
    if (marca !== undefined) cliente.marca = marca;
    if (cantidadKg !== undefined) cliente.cantidadKg = Number(cantidadKg);
    if (precioKg !== undefined) cliente.precioKg = Number(precioKg);
    if (monto !== undefined) cliente.monto = Number(monto);
    if (deuda !== undefined) cliente.deuda = Number(deuda);
    if (saldado !== undefined) cliente.saldado = saldado;

    // Guardamos los cambios en MySQL
    await cliente.save();

    res.status(200).json(cliente);
  } catch (error) {
    console.error("❌ ERROR al actualizar cliente:", error);
    res.status(500).json({ error: error.message });
  }
};

// ==============================================================
// 5. ELIMINAR UN CLIENTE (DELETE :id)
// ==============================================================
const eliminarClientes = async (req, res) => {
  const { id } = req.params;
  try {
    await Clientes.destroy({ where: { id } });
    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  clientesInfo,
  nuevoClientes,
  clienteId,
  updateClientes,
  eliminarClientes,
};
