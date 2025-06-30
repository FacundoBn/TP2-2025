import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY = process.env.PASS_TOKEN;

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
