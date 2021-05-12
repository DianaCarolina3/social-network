module.exports = {
  api: {
    port: process.env.PORT || 3000,
  },
  jwt: {
    secret: process.env.SECRET || "notasecret!!",
  },
  mysgl: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
  },
};