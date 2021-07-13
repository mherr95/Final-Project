require("dotenv").config();
const Pool = require("pg").Pool;

const developmentConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: process.env.PORT,
};

const productionConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
};

console.log(productionConfig);

const pool = new Pool(
  process.env.NODE_ENV === "production" ? productionConfig : developmentConfig
);

module.exports = pool;
