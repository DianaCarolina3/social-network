module.exports = {
  api: {
    port: process.env.PORT || 3000,
  },
  post: {
    port: process.env.POST_PORT || 3002,
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
  sqlService: {
    host: process.env.MYSQL_SERVICE_HOST || "localhost",
    port: process.env.MYSQL_SERVICE_PORT || 3001,
  },
};
