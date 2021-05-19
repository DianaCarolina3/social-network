const { nanoid } = require("nanoid");
const auth = require("../auth");
const error = require("../../../utils/error");
const TABLE = "user";

module.exports = function (injectorStore, inyectedCache) {
  let store = injectorStore;
  let cache = inyectedCache;

  //si viene vacio
  if (!store) {
    store = require("../../../store/mysql");
  }
  if (!cache) {
    cache = require("../../../store/mysql");
  }

  const list = async () => {
    let users = await cache.list(TABLE);

    if (!users) {
      console.log("No estaba en caché, bucando en db");
      users = await store.list(TABLE);
      cache.upsert(TABLE, users);
    } else {
      console.log("Traemos datos de cache");
    }

    return users;
  };

  const get = async (id) => {
    if (!id) {
      throw error("No existe user", 404);
    }

    let user = await cache.list(TABLE, id);

    if (!user) {
      user = await store.get(TABLE, id);
      cache.upsert(TABLE, user);
      console.log("No estaba en caché, bucando en db");
    } else {
      console.log("Traemos datos de cache");
    }

    return user;
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
