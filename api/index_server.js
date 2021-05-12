const express = require("express");
const app = express();

const config = require("../config");
const errors = require("../network/errors");
const bodyParser = require("body-parser");

const auth = require("./components/auth/network_auth");
const user = require("./components/user/network_user");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//ROUTES
app.use("/api/auth", auth);
app.use("/api/user", user);

app.use(errors);

app.listen(config.api.port, () => {
  console.log(`Api listen in the port: ${config.api.port}`);
});
