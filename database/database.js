import dotenv from "dotenv";
dotenv.config()
import { Client } from "pg";


const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client
  .connect()
  .catch((err) => console.error("database connection error", err));

export default client;
