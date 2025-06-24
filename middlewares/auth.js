// middlewares/auth.js
import jwt from "jsonwebtoken";

const SECRET = "tu_clave_secreta"; // Mismo secreto que usaste para generar el token

export const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ error: "Token no proporcionado" });

  const token = authHeader.split(" ")[1]; // Espera formato: Bearer token123

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded; // Lo dejamos disponible en la request
    next();
  } catch (error) {
    return res.status(403).json({ error: "Token inválido o expirado" });
  }
};

// Middleware adicional para validar rol
export const soloAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Acceso denegado: se requiere rol admin" });
  }
  next();
};
