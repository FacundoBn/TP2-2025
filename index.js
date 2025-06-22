import express from "express";
import estacionamientoRoutes from "./routes/estacionamientos.routes.js";
import ocupacionRoutes from "./routes/routersOcupacion.js";
import vehiculoRoutes from "./routes/vehiculoRoutes.js";
import connection from "./connection/connection.js";

const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json({ strict: false }));

// Rutas
app.use("/estacionamientos", estacionamientoRoutes);
app.use("/ocupaciones", ocupacionRoutes);
app.use("/vehiculos", vehiculoRoutes);

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
