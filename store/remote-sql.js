const remote = require("./remote");
const config = require("../config");

const host = config.sqlService.host;
const port = config.sqlService.port;

module.exports = new remote(host, port);
