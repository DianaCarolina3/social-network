//connecion con Redis
const redis = require("redis");

require("dotenv").config({ path: ".env" });
//se deja en () si esta en local
//si no esta en local se crea ({object})
const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});
//los datos a redis se guardan en string

const list = (table) => {
  return new Promise((resolve, reject) => {
    client.get(table, (err, data) => {
      if (err) return reject(err);

      let res = data || null;
      if (data) {
        //de string a object
        res = JSON.parse(data);
      }

      if (data && data.id) {
        let info = `${table}_${id}`;
        return list(info);
      }

      resolve(res);
    });
  });
};

const upsert = async (table, data) => {
  let key = table;
  if (data && data.id) {
    key = `${key}_${data.id}`;
  }

  await client.setex(key, 10, JSON.stringify(data));
  return true;
};

module.exports = {
  list,
  upsert,
};
