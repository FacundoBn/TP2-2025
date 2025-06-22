import { Sequelize } from "sequelize";

// Reemplazá la contraseña si tenés una configurada, o dejá "" si no
const connection = new Sequelize("estacionamiento_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

try {
  await connection.authenticate();
  console.log("✅ Conexión a la base de datos establecida correctamente.");
} catch (error) {
  console.error("❌ No se pudo conectar a la base de datos:", error);
}

export default connection;
