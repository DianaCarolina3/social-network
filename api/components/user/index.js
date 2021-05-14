// const store = require("../../../store/mysql");
const store = require("../../../store/remote-sql");
const controller = require("./controller_user");

//el controlador es una funcion que le pasamos la db
module.exports = controller(store);
