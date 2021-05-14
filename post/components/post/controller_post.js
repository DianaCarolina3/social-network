const { nanoid } = require("nanoid");
const error = require("../../../utils/error");
const COLLECTION = "post";

module.exports = function (injectorStore) {
  let store = injectorStore;
  if (!store) {
    store = require("../../../store/dummy");
  }

  const list = () => {
    return store.list(COLLECTION);
  };

  const get = async (id) => {
    if (!id) {
      throw error("No existe el post", 404);
    }
    return await store.get(COLLECTION, id);
  };

  const upsert = (user, body) => {
    data = {
      id: body.id ? body.id : nanoid(20),
      user: user,
      text: body.text,
    };
    return store.upsert(COLLECTION, data).then(() => data);
  };

  const like = async (user, post) => {
    postLike = {
      user_from: user,
      post_to: post,
    };
    return await store
      .upsert(`${COLLECTION}_like`, postLike)
      .then(() => postLike);
  };

  const postsLiked = async (user_from) => {
    join = "";
    join[COLLECTION] = "post_to";
    const query = { user_from: user_from };
    return await store.query(`${COLLECTION}_like`, query, join);
  };

  return {
    list,
    get,
    upsert,
    like,
    postsLiked,
  };
};
