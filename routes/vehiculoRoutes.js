import express from 'express';
import {
  crearVehiculo,
  obtenerVehiculos,
  obtenerVehiculoPorPatente,
  eliminarVehiculo
} from '../controllers/vehiculoController.js';

import { verificarToken, soloAdmin } from "../middlewares/auth.js";


const router = express.Router();

// Accesibles a cualquier usuario autenticado
router.post("/", verificarToken, crearVehiculo);
router.get("/", verificarToken, obtenerVehiculos);
router.get("/:patente", verificarToken, obtenerVehiculoPorPatente);

// Solo admin
router.delete("/:patente", verificarToken, soloAdmin, eliminarVehiculo);

export default router;
