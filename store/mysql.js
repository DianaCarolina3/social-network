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
    connection.query(`SELECT * FROM ${table} WHERE id = ${id}`, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
};

const insert = (table, data) => {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const update = (table, data) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE ${table} SET ? WHERE id=?`,
      [data, data.id],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

const upsert = (table, data) => {
  if (data && data.id) {
    return update(table, data);
  } else {
    return insert(table, data);
  }
};

//verificacion al inicio de seccion el username
const query = (table, query) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} WHERE ?`, query, (err, result) => {
      if (err) return reject(err);
      resolve(result[0] || null);
    });
  });
};

module.exports = {
  list,
  get,
  upsert,
  query,
};
