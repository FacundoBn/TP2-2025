import express from "express";
import estacionamientoRoutes from "./routes/estacionamientos.routes.js";
import ocupacionRoutes from "./routes/routersOcupacion.js";
import vehiculoRoutes from "./routes/vehiculoRoutes.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import connection from "./connection/connection.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 3000;

app.use(cookieParser()); // Cookie

// Middleware para parsear JSON
app.use(express.json({ strict: false }));

// Middleware para establecer un timeout de 10 segundos en las respuestas
app.use((req, res, next) => {
  res.setTimeout(10000, () => {
    console.log(`Tiempo de espera agotado para: ${req.method} ${req.originalUrl}`);
    if (!res.headersSent) {
      res.status(503).json({ error: "Tiempo de espera agotado. El servidor no respondió a tiempo." });
    }
  });
  next();
});

// Rutas
app.use("/estacionamientos", estacionamientoRoutes);
app.use("/ocupaciones", ocupacionRoutes);
app.use("/vehiculos", vehiculoRoutes);
app.use("/usuarios", usuarioRoutes);

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
