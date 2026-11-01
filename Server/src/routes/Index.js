const { Router } = require("express");
const clientesRouter = require("./clientesRouter");
const pedidosRouter = require("./pedidosRouter");

const mainRouter = Router();

// Endpoint de salud (Health Check) para que Render y el navegador verifiquen estado activo
mainRouter.get("/", (req, res) => {
  res.status(200).json({
    status: "online",
    message: "SUZ CRM Backend API activo",
    timestamp: new Date().toISOString(),
  });
});

mainRouter.use("/clientes", clientesRouter);
mainRouter.use("/pedidos", pedidosRouter);

module.exports = mainRouter;
