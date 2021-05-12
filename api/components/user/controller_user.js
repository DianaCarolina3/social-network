const { nanoid } = require("nanoid");
const auth = require("../auth");
const TABLE = "user";

module.exports = function (injectorStore) {
  //si viene vacio
  let store = injectorStore;
  if (!store) {
    store = require("../../../store/dummy");
  }

  const list = () => {
    return store.list(TABLE);
  };

  const get = (id) => {
    return store.get(TABLE, id);
  };

  const upsert = async (data) => {
    user = {
      id: data.id ? data.id : nanoid(20),
      name: data.name,
      username: data.username,
    };

    //al actualizar datos o cambiarlos
    if (data.password || data.username) {
      await auth.upsert({
        id: user.id,
        username: user.username,
        password: data.password,
      });
    }

    return store.upsert(TABLE, user).then(() => user);
  };

  // const remove = (id) => {
  //   return store.remove(TABLE, id);
  // };

  return {
    list,
    get,
    upsert,
    // remove,
  };
};
