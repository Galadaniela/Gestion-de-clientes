/* eslint-disable new-cap */
const functions = require("firebase-functions");
// const express = require("express");
const corsApp = require("../../CORS");
const {Router} = require("express");
const clientesRouter = Router();
const {clientesInfo, nuevoClientes, clienteId, updateClientes, eliminarClientes} = require("../controller/clientesController.js");
// const {Clientes, Pedidos} = require("../db.js");

clientesRouter.get("/", async (req, res) =>{
  const {name}= req.query;
  const buscarClientes = await clientesInfo();
  if (name) {
    const clientesName = await buscarClientes.filter((elem) => elem.name.toLowerCase().includes(name.toLowerCase()));

    const result = (clientesName.length)?
        res.status(200).json(clientesName) :
        res.status(400).send("no existe");
    return result;
  }
  res.status(200).send(buscarClientes);
});
clientesRouter.post("/", nuevoClientes);

clientesRouter.get("/:id", clienteId);
clientesRouter.put("/:id", updateClientes);
clientesRouter.delete("/:id", eliminarClientes);


module.exports = clientesRouter;
exports.tuFuncion = functions.https.onRequest(corsApp);
