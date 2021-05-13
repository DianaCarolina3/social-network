const express = require("express");
const app = express();

const swaggerUI = require("swagger-ui-express");
const swaggerDoc = require("./swagger.json");

const config = require("../config");
const errors = require("../network/errors");
const bodyParser = require("body-parser");

const auth = require("./components/auth/network_auth");
const post = require("./components/post/network_post");
const user = require("./components/user/network_user");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//ROUTES
app.use("/api/auth", auth);
app.use("/api/post", post);
app.use("/api/user", user);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.use(errors);

app.listen(config.api.port, () => {
  console.log(`Api listen in the port: ${config.api.port}`);
});
