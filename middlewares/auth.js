import { verificarToken as verificarJWT } from "../utils/token.js";

// Middleware: verificar que haya un token válido
export const verificarToken = (req, res, next) => {
  // ✅ Leer el token desde la cookie
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  const decoded = verificarJWT(token);
  if (!decoded) {
    return res.status(403).json({ error: "Token inválido o expirado" });
  }

  req.user = decoded;
  next();
};

// Middleware: solo permite si el usuario tiene rol admin
export const soloAdmin = (req, res, next) => {
  if (req.user.rol !== "admin") {
    return res.status(403).json({ error: "Acceso denegado: requiere rol admin" });
  }
  next();
};

