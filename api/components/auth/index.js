const store = require("../../../store/mysql");
const controller = require("./controller_auth");

module.exports = controller(store);
