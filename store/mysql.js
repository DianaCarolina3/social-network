const mysql = require("mysql");

require("dotenv").config({ path: ".env" });
const dbconfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DB,
};

let connection;
function handleConnection() {
  connection = mysql.createConnection(dbconfig);

  //inicio conección
  connection.connect((err) => {
    if (err) {
      console.error("[db error] ", err);
      setTimeout(handleConnection, 2000);
    } else {
      console.log("db conected");
    }
  });

  //durante la conneción
  connection.on("error", (err) => {
    console.error("[db error] ", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleConnection();
    } else {
      throw err;
    }
  });
}
handleConnection();

//funciones

const list = (table) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
};

const get = (table, id) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} WHERE id = ?`, id, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
};

const upsert = async (table, data) =>
  new Promise((resolve, reject) => {
    connection.query(
      //si el id esta en la tabla, actualiza los datos, de lo contrario los inserta
      `INSERT INTO ${table} SET ? ON DUPLICATE KEY UPDATE ?`,
      [data, data],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      }
    );
  });

//verificacion al inicio de seccion el username
const query = (table, query, join) => {
  let joinQuery = "";
  if (join) {
    const key = Object.keys(join)[0];
    //user
    const val = join[key];
    //user_to
    joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
    // JOIN user ON user_follow.user_to = user.id
  }

  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`,
      query,
      (err, result) => {
        if (err) return reject(err);
        resolve(result[0] || null);
      }
    );
  });
};

const remove = (table, id) => {
  return new Promise((resolve, reject) => {
    connection.query(`DELETE FROM ${table} WHERE id=?`, id, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  list,
  get,
  upsert,
  query,
  remove,
};

// const insert = (table, data) => {
//   return new Promise((resolve, reject) => {
//     connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
//       if (err) return reject(err);
//       resolve(result);
//     });
//   });
// };

// const update = (table, data) => {
//   return new Promise((resolve, reject) => {
//     connection.query(
//       `UPDATE ${table} SET ? WHERE id=?`,
//       [data, data.id],
//       (err, result) => {
//         if (err) return reject(err);
//         resolve(result);
//       }
//     );
//   });
// };

// const upsert = (table, data) => {
//   if (data && data.id) {
//     return update(table, data);
//   } else {
//     return insert(table, data);
//   }
// };
