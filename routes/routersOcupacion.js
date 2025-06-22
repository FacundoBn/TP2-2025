import express from "express";
import {
  ingresarVehiculo,
  salirVehiculo,
  salirVehiculoPorPatente, 
  listarActivos,
  listarInactivos,
} from "../controllers/ocupacionController.js";

const router = express.Router();

router.post("/ingresar", ingresarVehiculo);
router.put("/salir/:id", salirVehiculo);
router.put("/salir/patente/:patente",  salirVehiculoPorPatente); 
router.get("/activos", listarActivos);
router.get("/inactivos", listarInactivos);

export default router;
