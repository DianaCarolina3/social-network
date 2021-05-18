const remote = require("./remote");
const config = require("../config");

const host = config.cacheService.host;
const port = config.cacheService.port;

module.exports = new remote(host, port);
