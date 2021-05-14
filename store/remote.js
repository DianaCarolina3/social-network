//permite hacer peticiones http
const request = require("request");

function createRemoteDB(host, port) {
  const URL = `http://${host}:${port}`;

  const list = (table) => {
    return req("GET", table);
  };
  // const get = (table, id)
  // const upsert = (table, data)
  // const query = (table, query, join)

  function req(method, table, data) {
    let url = `${URL}/${table}`;
    body = "";

    return new Promise((resolve, reject) => {
      //ejecuta el request
      request(
        {
          method,
          headers: {
            //todo por json
            "content-type": "application/json",
          },
          url,
          body,
        },
        //request funciona con callbacks
        (err, req, body) => {
          if (err) {
            console.error("Error con la base de datos remota", err);
            return reject(err.message);
          }

          const resp = JSON.parse(body);
          return resolve(resp.body);
        }
      );
    });
  }

  return {
    list,
  };
}

module.exports = createRemoteDB;
