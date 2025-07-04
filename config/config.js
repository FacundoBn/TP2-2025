import dotenv from "dotenv";
dotenv.config();

export default {
  development: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS || null,
    database: process.env.DB_NAME || "estacionamiento_db",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql",
  },
};
