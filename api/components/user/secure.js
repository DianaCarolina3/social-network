//gestion de permisos antes de llegar a la logica de negocios
const Auth = require("../../../Auth");

module.exports = function checkAuth(action) {
  function middleware(req, res, next) {
    switch (action) {
      case "update":
        //comprueba el usuario por id y token
        const owner = req.body.id;
        Auth.check.own(req, owner);
        next();
        break;

      case "follow":
      case "delete":
        //comprueba el usuario por token
        Auth.check.token(req);
        next();
        break;

      default:
        next();
    }
  }

  return middleware;
};

//check es objeto con funciones
