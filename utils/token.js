/* Este archivo se va a encargar de generar y verificar tokens JWT. */
import jwt from "jsonwebtoken";

const SECRET_KEY = "tu_clave_secreta_super_segura"; // En producción usarías una variable de entorno

// Generar token
export const generarToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, {
    expiresIn: "1h", // el token dura 1 hora
  });
};

// Verificar token
export const verificarToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
};
