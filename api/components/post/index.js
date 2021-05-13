const store = require("../../../store/mysql");
const controller = require("./controller_post");

module.exports = controller(store);
