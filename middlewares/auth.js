import { verificarToken as verificarJWT } from "../utils/token.js";

// Middleware: verificar que haya un token válido
export const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1];
  const payload = verificarJWT(token);

  if (!payload) {
    return res.status(403).json({ error: "Token inválido o expirado" });
  }

  req.user = payload; // guarda los datos del token en req.user para usar en otros middlewares
  next();
};

// Middleware: solo permite si el usuario tiene rol admin
export const soloAdmin = (req, res, next) => {
  if (req.user.rol !== "admin") {
    return res.status(403).json({ error: "Acceso denegado: requiere rol admin" });
  }
  next();
};

// Middleware: permite admin u operador
export const adminUOperador = (req, res, next) => {
  if (req.user.rol !== "admin" && req.user.rol !== "operador") {
    return res.status(403).json({ error: "Acceso denegado: requiere rol válido" });
  }
  next();
};
