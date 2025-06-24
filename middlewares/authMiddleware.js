/* Verifica si hay token en el Authorization Header.

Lo valida.

Si es válido, adjunta el usuario (decodificado) a req.user.

Si no, devuelve un error 401 o 403. */

import jwt from "jsonwebtoken";

const SECRET_KEY = "secretoSuperSeguro"; // usá la misma clave que en utils/token.js

export const verificarToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ error: "Token no proporcionado." });

  const token = authHeader.split(" ")[1]; // Espera formato: Bearer TOKEN
  if (!token) return res.status(401).json({ error: "Token inválido." });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // { id, email, rol }
    next();
  } catch (error) {
    res.status(403).json({ error: "Token inválido o expirado." });
  }
};
// Para validar si es usuario admin
export const soloAdmin = (req, res, next) => {
  if (req.user?.rol !== "admin") {
    return res.status(403).json({ error: "Acceso denegado. Requiere rol admin." });
  }
  next();
};
