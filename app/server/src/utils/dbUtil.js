import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

// Configure the PostgreSQL connection
const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "chronoria",
  password: process.env.DB_PASSWORD || "password",
  port: process.env.DB_PORT || 5432, // Default PostgreSQL port
});

pool.on("connect", () => {
  console.log("Connected to the database.");
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle database connection", err);
  process.exit(-1);
});

export { pool };
