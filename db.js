const Pool = require("pg").Pool;

const pool = new Pool({
  user: "michaelherr",
  password: "secure-new-password",
  database: "users_database",
  host: "localhost",
  port: "5432",
});

module.exports = pool;
