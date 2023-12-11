/* eslint-disable new-cap */
const functions = require("firebase-functions");
// const express = require("express");
const corsApp = require("../../CORS");
const {Router} = require("express");
const clientesRouter = require("./clientesRouter");
const pedidosRouter = require("./pedidosRouter");
// const clienteCRouter = require("./clienteCRouter");
const mainRouter = Router();

mainRouter.use("/clientes", clientesRouter);
mainRouter.use("/pedidos", pedidosRouter);
// mainRouter.use("/clientesChaco" ,clienteCRouter);


module.exports = mainRouter;
exports.tuFuncion = functions.https.onRequest(corsApp);
