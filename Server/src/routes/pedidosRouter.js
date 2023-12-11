/* eslint-disable new-cap */

const {Router} = require("express");
const pedidosRouter = Router();

pedidosRouter.get("/", (req, res) =>{
  res.send("Estoy en user");
});


module.exports = pedidosRouter;
