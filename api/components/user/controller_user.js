const { nanoid } = require("nanoid");
const auth = require("../auth");
const TABLE = "user";

module.exports = function (injectorStore) {
  //si viene vacio
  let store = injectorStore;
  if (!store) {
    store = require("../../../store/mysql");
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

  const follow = (from, to) => {
    return store.upsert(`${TABLE}_follow`, {
      user_from: from,
      user_to: to,
    });
  };

  const followers = (from) => {
    const join = {};
    join[TABLE] = "user_to";
    const query = { user_from: from };
    return store.query(`${TABLE}_follow`, query, join);
  };

  const remove = (id) => {
    return store.remove(TABLE, id).then(() => `user removed`);
  };

  return {
    list,
    get,
    upsert,
    follow,
    followers,
    remove,
  };
};
