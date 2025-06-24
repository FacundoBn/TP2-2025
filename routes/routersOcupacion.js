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

const router = express.Router();

router.post("/ingresar", ingresarVehiculo);
router.put("/salir/:id", salirVehiculo);
router.put("/salir/patente/:patente", salirVehiculoPorPatente);
router.get("/activos", listarActivos);
router.get("/inactivos", listarInactivos);
router.get("/historial", listarHistorial);
router.get("/lugar/:id", obtenerOcupacionPorLugar);
router.delete("/eliminar/:id", eliminarOcupacion);

export default router;
