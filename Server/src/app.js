const express = require("express");
const morgan = require("morgan");
const mainRouter = require("./routes/Index");
const functions = require("firebase-functions");

const corsApp = require("../CORS");
const app = express();
// var cors = require('cors');
// app.use(cors());

const cors = require("cors");


// Habilitar CORS solo para tu frontend en Vercel
const corsOptions = {
  origin: "https://tu-frontend-en-vercel.vercel.app",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(morgan("dev"));
app.use(express.json());
// app.use(express.urlencoded({extended: false}))
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use(mainRouter);

// app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
//   const status = err.status || 500;
//   const message = err.message || err;
//   console.error(err);
//   res.status(status).send(message);
// });

//  app.use((req,res,next)=>{
//      console.log("hola1");
//  next()
//  })

module.exports = app;
exports.tuFuncion = functions.https.onRequest(corsApp);
