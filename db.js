require("dotenv").config();
const Pool = require("pg").Pool;

const isProduction = process.env.NODE_ENV === "production";

const connection = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}:${process.env.DB_HOST}: ${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const pool = new Pool({
  connection: isProduction ? process.env.DATABASE_URL : connection,
});

module.exports = pool;
