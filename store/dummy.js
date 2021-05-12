const db = {
  user: [],
};

const list = async (table) => {
  let listTable = (await db[table]) || [];
  return listTable;
};

const get = async (table, id) => {
  let collection = await list(table);
  return collection.filter((item) => item.id === id)[0] || null;
};

const upsert = async (table, data) => {
  if (!db[table]) {
    db[table] = [];
  }
  console.log(db);

  return db[table].push(data);
};

//verificacion al inicio de seccion el username
const query = async (table, query) => {
  let collection = await list(table);
  let keys = Object.keys(query);
  let key = keys[0];
  return collection.filter((item) => item[key] === query[key])[0] || null;
};

// const remove = async (table, id) => {
//   let collection = await list(table);
//   const user = collection.filter((item) => item.id === id)[0] || null;
//   delete user
//   return user;
// };

module.exports = {
  list,
  get,
  upsert,
  query,
  // remove,
};
