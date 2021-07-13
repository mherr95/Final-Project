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
  connectionString:
    "postgres://snkyvrqveintpc:423729d9a59e3d34c871111633cd63654fc8995b09ff36415a0e0a208fc6fb0b@ec2-52-5-1-20.compute-1.amazonaws.com:5432/dqe9mfsg19qsk",
  ssl: {
    rejectUnauthorized: false,
  },
};

console.log(productionConfig);

const pool = new Pool(
  process.env.NODE_ENV === "production" ? productionConfig : developmentConfig
);

module.exports = pool;
