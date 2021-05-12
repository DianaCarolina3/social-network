//validacion de usuarios
const bcrypt = require("bcrypt");
const Auth = require("../../../Auth");
const TABLE = "auth";

module.exports = function (injectorStore) {
  //si viene vacio
  let store = injectorStore;
  if (!store) {
    store = require("../../../store/dummy");
  }

  //acceso y verificacion al inicio de seccion
  const login = async (username, password) => {
    const data = await store.query(TABLE, { username: username });

    //verificar la contraseña
    return bcrypt.compare(password, data.password).then((theSame) => {
      if (theSame === true) {
        //genera token
        return Auth.sign(data);
      } else {
        throw new Error("Información invalida");
      }
    });
  };

  //acceso y verificacion al ingresar y actualizar datos
  const upsert = async (data) => {
    const authData = {
      id: data.id,
    };

    if (data.name) {
      authData.name = data.name;
    }
    if (data.username) {
      authData.username = data.username;
    }
    if (data.password) {
      //cripta la contraseña
      authData.password = await bcrypt.hash(data.password, 5);
    }

    return store.upsert(TABLE, authData);
  };

  return {
    upsert,
    login,
  };
};
