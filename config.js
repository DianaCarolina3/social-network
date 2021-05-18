module.exports = {
  api: {
    port: process.env.PORT || 3000,
  },
  post: {
    port: process.env.POST_PORT || 3002,
  },
  jwt: {
    secret: process.env.SECRET,
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
  cacheService: {
    host: process.env.CACHE_SERVICE_HOST || "localhost",
    port: process.env.CACHE_SERVICE_PORT || 3003,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
  },
};

// jdbc:mysql://myuser:secret_password@localhost:3306/db
// jdbc:mysql://myhost1:port1,myhost2:port2/db
// jdbc:mysql://myuser:secret_password@[myhost1:port1,myhost2:port2]/db
