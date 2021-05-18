const express = require("express");

const bodyParser = require("body-parser");
const router = require("./network");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// RUTAS
app.use("/", router);

require("dotenv").config({ path: ".env" });
app.listen(process.env.MYSQL_SERVICE_PORT, () => {
  console.log(`Service SQL listen on port: ${process.env.MYSQL_SERVICE_PORT}`);
});
