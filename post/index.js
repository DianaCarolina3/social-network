const express = require("express");
const app = express();

const config = require("../config");
const errors = require("../network/errors");
const bodyParser = require("body-parser");

const post = require("./components/post/network_post");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//ROUTER
app.use("/api/post", post);

app.use(errors);

app.listen(config.post.port, () => {
  console.log(`Server post listen on the port: ${config.post.port}`);
});
