const controller = require("./controller_user");
const config = require("../../../config");

require("dotenv").config({ path: ".env" });

let store, cache;
if (config.remoteDB === true) {
  store = require("../../../store/remote-sql");
  cache = require("../../../store/remote_cache");
} else {
  store = require("../../../store/mysql");
  cache = require("../../../store/redis");
}

//el controlador es una funcion que le pasamos la db
module.exports = controller(store, cache);
