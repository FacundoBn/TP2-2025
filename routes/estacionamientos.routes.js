import { Router } from "express";
import {
  getEstacionamientos,
  createEstacionamiento,
  updateEstacionamiento,
  deleteEstacionamiento,
} from "../controllers/estacionamiento.controller.js";

const router = Router();

router.get("/", getEstacionamientos);              // GET /estacionamientos
router.post("/", createEstacionamiento);           // POST /estacionamientos
router.put("/:id", updateEstacionamiento);         // PUT /estacionamientos/:id
router.delete("/:id", deleteEstacionamiento);      // DELETE /estacionamientos/:id

export default router;
