//database.js
import dotenv from "dotenv";
dotenv.config();
import pkg from "pg";
const { Client } = pkg;

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log("connected to database successfully");
  } catch (err) {
    throw new Error("database connection error", err);
  }
};

connectToDatabase();

// Graceful shutdown on process termination
process.on("SIGINT", async () => {
  await client.end();
  console.log("Database connection closed");
  process.exit(0);
});

export default client;
