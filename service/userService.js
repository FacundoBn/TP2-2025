
/* Validar el login (comparando el email y password)

Generar el token con generarToken (desde utils/token.js)

Exponer métodos que puedas usar desde el controlador. */

import Usuario from "../models/Usuario.js";
import { generarToken } from "../utils/token.js";

class UserService {
  // Login de usuario
  async login(data) {
    const { email, password } = data;

    // Buscar al usuario por email
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      throw new Error("Usuario no encontrado.");
    }

    // Por ahora comparación simple (sin bcrypt)
    if (usuario.password !== password) {
      throw new Error("Contraseña incorrecta.");
    }

    // Payload para el token
    const payload = {
      id: usuario.id,
      email: usuario.email,
      rol: usuario.rol,
    };

    // Generar token
    const token = generarToken(payload);

    return { token, usuario: { id: usuario.id, nombre: usuario.nombre, rol: usuario.rol } };
  }

  // Obtener todos los usuarios (opcional)
  async getAll() {
    return await Usuario.findAll({
      attributes: { exclude: ["password"] },
    });
  }

  // Obtener perfil desde token decodificado (si implementás un middleware con req.user)
  async getProfile(userData) {
    return await Usuario.findByPk(userData.id, {
      attributes: { exclude: ["password"] },
    });
  }
}

export default new UserService();
