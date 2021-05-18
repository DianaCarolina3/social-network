const express = require("express");
const app = express();

const errors = require("../network/errors");
const bodyParser = require("body-parser");

const post = require("./components/post/network_post");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//ROUTER
app.use("/api/post", post);

app.use(errors);

require("dotenv").config({ path: ".env" });
app.listen(process.env.POST_PORT, () => {
  console.log(`Server post listen on the port: ${process.env.POST_PORT}`);
});
