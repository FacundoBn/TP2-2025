import { Sequelize } from "sequelize";

// ⚠️ Reemplazá estos valores con los de tu base de datos local
const connection = new Sequelize("estacionamiento_db", "root", "tu_contraseña", {
  host: "localhost",
  dialect: "mysql", // Sequelize usa 'mysql' aunque uses MariaDB
  logging: false,   // opcional: para no ver las queries en consola
});

export default connection;
