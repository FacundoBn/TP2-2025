import express from "express";
import {
  ingresarVehiculo,
  salirVehiculo,
  salirVehiculoPorPatente,
  listarActivos,
  listarInactivos,
  listarHistorial,
  obtenerOcupacionPorLugar,
  eliminarOcupacion
} from "../controllers/ocupacionController.js";

import { verificarToken, soloAdmin } from "../middlewares/auth.js";

const router = express.Router();

// Rutas accesibles para cualquier usuario con token (admin u operador)
router.post("/ingreso", verificarToken, ingresarVehiculo);
router.put("/salida/:id", verificarToken, salirVehiculo);
router.put("/salida/patente/:patente", verificarToken, salirVehiculoPorPatente);
router.get("/activos", verificarToken, listarActivos);
router.get("/inactivos", verificarToken, listarInactivos);
router.get("/historial", verificarToken, listarHistorial);
router.get("/lugar/:id", verificarToken, obtenerOcupacionPorLugar);

// Ruta solo para admin
router.delete("/:id", verificarToken, soloAdmin, eliminarOcupacion);


export default router;
