const Auth = require("../../../Auth");

module.exports = function checkAuth(action) {
  function middleware(req, res, next) {
    switch (action) {
      case "send":
      case "like":
        Auth.check.token(req);
        next();
        break;

      case "update":
        const owner = req.body.id;
        Auth.check.own(req, owner);
        next();
        break;

      default:
        next();
    }
  }

  return middleware;
};
