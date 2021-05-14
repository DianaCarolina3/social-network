const express = require("express");

const bodyParser = require("body-parser");
const config = require("../config");
const router = require("./network");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// RUTAS
app.use("/", router);

app.listen(config.sqlService.port, () => {
  console.log(`Service SQL listen on port: ${config.sqlService.port}`);
});
