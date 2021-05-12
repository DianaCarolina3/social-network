// autorizaciones
const jwt = require("jsonwebtoken");
const config = require("../config");
const error = require("../utils/error");
const secret = config.jwt.secret;

//genera secreto y token
const sign = (data) => {
  /*
  -JSON.parse()toma una cadena JSON y la transforma en un objeto JavaScript.
      Object {name:"Sammy",age:6,favoriteFood:"Tofu"}
  -JSON.stringify()toma un objeto JavaScript y lo transforma en una cadena JSON.
      "{"name":"Sammy","age":6,"favoriteFood":"Tofu"}"
*/
  data = JSON.parse(JSON.stringify(data));
  return jwt.sign(data, secret);
};

//2.verifica token
const verify = (token) => {
  return jwt.verify(token, secret);
};

//secure: gestion de permisos antes de llegar a la logica de negocios
const check = {
  own: function (req, owner) {
    const decoded = decodeHeader(req);
    console.log(decoded);

    //comprobacion
    if (decoded.id !== owner) {
      throw error("No puedes hacer esto", 401);
    }
  },

  token: function (req) {
    decodeHeader(req);
  },
};

//1.extrae el token del header
const getToken = (authorization) => {
  if (!authorization) {
    throw error("no viene token", 401);
  }

  if (authorization.indexOf("Bearer ") === -1) {
    throw error("Formato invalido", 401);
  }

  let token = authorization.replace("Bearer ", "");
  return token;
};

// *** decodificar token ***
function decodeHeader(req) {
  //requiere el token
  const authorization = req.headers.authorization || "";
  //1.saca el token
  const token = getToken(authorization);
  //2.verifica el token
  const decoded = verify(token);

  req.user = decoded;

  return decoded;
}

module.exports = {
  sign,
  check,
};
