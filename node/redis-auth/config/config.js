module.exports = {
  port: 5000,
  db: {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_DATABASE || "auth_db",
    connectionLimit: process.env.DB_CONNLIMIT || 10
  },
  redis: {
    host: process.env.REDIS_HOST || "localhost",
    port: process.env.REDIS_PORT || "6379"
  },
  nodemailer: {
    service: process.env.MAIL_SERVICE || 'xxxxx',
    auth: {
        user: process.env.MAIL_USER || 'xxxxx',
        pass: process.env.MAIL_PASS || 'xxxxx'
    }
},
  tokenTime: process.env.TOKEN_TIME || 3000,
  resetTime: process.env.RESET_TIME || 3000
};
