
const {Clientes} = require("../db.js");
// const axios = require("axios");

const clientesInfo = async () => {
  try {
    const database = await Clientes.findAll();
    return database.map((cliente) => ({...cliente.dataValues}) );
  } catch (error) {
    console.error("Error al obtener la información de clientes:", error);
    throw error;
  }
  //   const  database = await Clientes.findAll();
  //   return[...database]

  //    return await Clientes.findAll({
  //     include:{
  //        model:Pedidos,
  //         attribute:["name"],
  //             through:{
  //                 attribute:[],
  //             }
  //     }
  //    })

// res.send("YES")
};

const nuevoClientes = async (req, res) =>{
  try {
    let {name, provincia, localidad, direccion, calle, monto, deuda, canal, fecha, telefono} = req.body;
    const newClient = await Clientes.create({name, provincia, localidad, direccion, calle, monto, deuda, canal, fecha, telefono});
    // Verifica el valor de 'deuda'
    if (deuda === undefined || deuda === null) {
      deuda = 0; // O puedes usar 'null' en lugar de 0 si es apropiado para tu base de datos.
    }


    res.status(200).json({
      message: "Cliente registrado exitosamente",
      cliente: newClient,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al registrar cliente",
      error: error.message,
    });
  }
};

const clienteId = async (req, res) =>{
  const {id} = req.params;
  try {
    const clientes = await Clientes.findOne({
      where: {
        id,
      },
    });
    res.json(clientes);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const updateClientes = async (req, res) =>{
  try {
    const {id} = req.params;
    const {name, provincia, localidad, direccion, calle, monto, deuda, canal, fecha, telefono} = req.body;

    const cliente = await Clientes.findByPk(id);
    cliente.name = name;
    cliente.provincia = provincia;
    cliente.localidad = localidad;
    cliente.direccion = direccion;
    cliente.calle = calle;
    cliente.telefono = telefono;
    cliente.monto = monto;
    cliente.deuda = deuda;
    cliente.canal = canal;
    cliente.fecha = fecha;


    await cliente.save();

    res.json(cliente);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const eliminarClientes = async (req, res) =>{
  const {id} = req.params;
  try {
    await Clientes.destroy({
      where: {
        id,
      },
    });
    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
module.exports = {clientesInfo, nuevoClientes, clienteId, updateClientes, eliminarClientes};
