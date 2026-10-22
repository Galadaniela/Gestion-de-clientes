const { Router } = require("express");
const clientesRouter = require("./clientesRouter");
const pedidosRouter = require("./pedidosRouter");

const mainRouter = Router();

mainRouter.use("/clientes", clientesRouter);
mainRouter.use("/pedidos", pedidosRouter);

module.exports = mainRouter;