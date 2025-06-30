import { Router } from "express";

import {
  getEstacionamientos,
  createEstacionamiento,
  updateEstacionamiento,
  deleteEstacionamiento
} from "../controllers/estacionamientoController.js";

import { verificarToken, soloAdmin } from "../middlewares/auth.js";

const router = Router();

// Rutas protegidas
router.get("/", verificarToken, getEstacionamientos);      // admin u operador
router.post("/", verificarToken, soloAdmin, createEstacionamiento);         // solo admin
router.put("/:id", verificarToken, soloAdmin, updateEstacionamiento);       // solo admin
router.delete("/:id", verificarToken, soloAdmin, deleteEstacionamiento);    // solo admin

export default router;
