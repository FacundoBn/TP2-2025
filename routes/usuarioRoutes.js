import { Router } from "express";
import {
  crearUsuario,
  listarUsuarios,
  eliminarUsuario,
  actualizarUsuario,
  loginUsuario,
} from "../controllers/usuarioController.js";

const router = Router();

router.post("/", crearUsuario);
router.get("/", listarUsuarios);
router.delete("/:id", eliminarUsuario);
router.put("/:id", actualizarUsuario);
router.post("/login", loginUsuario); // sólo para validar, sin token

export default router;
