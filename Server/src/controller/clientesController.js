const { Clientes } = require("../db.js");

const clientesInfo = async () => {
  try {
    const database = await Clientes.findAll();
    return database.map((cliente) => ({ ...cliente.dataValues }));
  } catch (error) {
    console.error("Error al obtener la información de clientes:", error);
    throw error;
  }
};

const nuevoClientes = async (req, res) => {
  try {
    let {
      name,
      provincia,
      localidad,
      direccion,
      calle,
      monto,
      deuda,
      canal,
      fecha,
      telefono,
    } = req.body;

    // ✅ Arreglamos la deuda ANTES del create
    if (deuda === undefined || deuda === null || deuda === "") {
      deuda = 0;
    }

    // ✅ calle es opcional: si no viene, null
    const newClient = await Clientes.create({
      name,
      provincia,
      localidad,
      direccion,
      calle: calle ?? null,
      monto,
      deuda,
      canal,
      fecha,
      telefono,
    });

    res.status(200).json({
      message: "Cliente registrado exitosamente",
      cliente: newClient,
    });
  } catch (error) {
    console.error("❌ ERROR al crear cliente:", error);   //  muestra el error real
    res.status(500).json({
      message: "Error al registrar cliente",
      error: error.message,
    });
  }
};

const clienteId = async (req, res) => {
  const { id } = req.params;
  try {
    const clientes = await Clientes.findOne({ where: { id } });
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateClientes = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      provincia,
      localidad,
      direccion,
      calle,
      monto,
      deuda,
      canal,
      fecha,
      telefono,
    } = req.body;

    const cliente = await Clientes.findByPk(id);
    if (!cliente) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    cliente.name = name;
    cliente.provincia = provincia;
    cliente.localidad = localidad;
    cliente.direccion = direccion;
    cliente.calle = calle ?? null;
    cliente.telefono = telefono;
    cliente.monto = monto;
    cliente.deuda = deuda ?? 0;
    cliente.canal = canal;
    cliente.fecha = fecha;

    await cliente.save();

    res.json(cliente);
  } catch (error) {
    console.error("❌ ERROR al actualizar cliente:", error);
    res.status(500).json({ error: error.message });
  }
};

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