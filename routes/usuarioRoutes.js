import { Router } from "express";
import {
  crearUsuario,
  listarUsuarios,
  eliminarUsuario,
  actualizarUsuario,
  loginUsuario,
} from "../controllers/usuarioController.js";
import { verificarToken, soloAdmin } from "../middlewares/auth.js";

const router = Router();

// Protegidas solo con token
router.get("/", verificarToken, listarUsuarios);
router.post("/", verificarToken, soloAdmin, crearUsuario);
router.put("/:id", verificarToken, soloAdmin, actualizarUsuario);
router.delete("/:id", verificarToken, soloAdmin, eliminarUsuario);
router.post("/login", loginUsuario); // sólo para validar, sin token

export default router;
