import express from "express";
import estacionamientoRoutes from "./routes/estacionamientos.routes.js";
import connection from "./connection/connection.js"; // para probar conexión a la base

const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use("/estacionamientos", estacionamientoRoutes);

// Probar conexión a la base
try {
  await connection.authenticate();
  console.log("✅ Conectado a la base de datos correctamente.");
} catch (error) {
  console.error("❌ Error al conectar con la base de datos:", error);
}

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
