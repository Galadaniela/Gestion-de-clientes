// const {Router} = require("express");
// const clienteCRouter = Router();

// const {clientesInfo,nuevoClientes,clienteId,updateClientes,eliminarClientes } = require("../controller/clientesChacoController.js")
// const {Clientes, Pedidos} = require("../db.js");

// clienteCRouter.get("/" , async(req, res) =>{
//     const {name}= req.query
//     const buscarClientes =  await clientesInfo()
//     if(name){
//         const clientesName = await buscarClientes.filter((elem) => elem.name.toLowerCase().includes(name.toLowerCase()))

//         const result = (clientesName.length)
//         ?res.status(200).json(clientesName)
//         : res.status(400).send("no existe")
//       return result
//     }
//     res.status(200).send(buscarClientes)
// })
// clienteCRouter.post("/" , nuevoClientes)

// clienteCRouter.get("/:id" , clienteId)
// clienteCRouter.put("/:id", updateClientes)
// clienteCRouter.delete("/:id" , eliminarClientes)


// module.exports = clienteCRouter
