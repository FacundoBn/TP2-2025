import Usuario from "../models/Usuario.js";
import Rol from "../models/Rol.js";
import { generarToken } from "../utils/token.js";

// Crear usuario
export const crearUsuario = async (req, res) => {
  const { nombre, email, password, rol_id } = req.body;

  if (!nombre || !email || !password || !rol_id) {
    return res.status(400).json({ error: "Todos los campos son obligatorios." });
  }

  if (!/^[a-zA-Z\s]+$/.test(nombre)) {
    return res.status(400).json({ error: "El nombre solo debe contener letras y espacios." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Formato de email inválido." });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: "La contraseña debe tener al menos 6 caracteres." });
  }

  try {
    const rolExistente = await Rol.findByPk(rol_id);
    if (!rolExistente) {
      return res.status(400).json({ error: "Rol no válido (ID inexistente)." });
    }

    const nuevoUsuario = await Usuario.create({ nombre, email, password, rol_id });
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(400).json({ error: "Ya existe un usuario con ese email." });
    } else {
      console.error("Error al crear usuario:", error);
      res.status(500).json({ error: "Error al crear el usuario." });
    }
  }
};

// Listar usuarios
export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: { exclude: ["password"] },
      include: { model: Rol, as: "rol", attributes: ["nombre"] },
    });
    res.json(usuarios);
  } catch (error) {
    console.error("Error al listar usuarios:", error);
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

// Eliminar usuario
export const eliminarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });

    await usuario.destroy();
    res.json({ mensaje: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
};

// Actualizar usuario
export const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, email, password, rol_id } = req.body;

  if (!nombre || !email || !password || !rol_id) {
    return res.status(400).json({ error: "Todos los campos son obligatorios." });
  }

  if (!/^[a-zA-Z\s]+$/.test(nombre)) {
    return res.status(400).json({ error: "El nombre solo debe contener letras y espacios." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Formato de email inválido." });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: "La contraseña debe tener al menos 6 caracteres." });
  }

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado." });

    const rolExistente = await Rol.findByPk(rol_id);
    if (!rolExistente) {
      return res.status(400).json({ error: "Rol no válido (ID inexistente)." });
    }

    if (email !== usuario.email) {
      const emailExistente = await Usuario.findOne({ where: { email } });
      if (emailExistente) {
        return res.status(400).json({ error: "Ya existe un usuario con ese email." });
      }
    }

    await usuario.update({ nombre, email, password, rol_id });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el usuario." });
  }
};

// Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email y contraseña son obligatorios." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Formato de email inválido." });
  }

  try {
    const usuario = await Usuario.findOne({
      where: { email },
      include: { model: Rol, as: "rol", attributes: ["nombre"] },
    });

    if (!usuario || usuario.password !== password) {
      return res.status(401).json({ error: "Credenciales inválidas." });
    }

    const payload = {
      id: usuario.id,
      email: usuario.email,
      rol: usuario.rol?.nombre || "sin rol",
    };

    const token = generarToken(payload);

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false, // true si usás HTTPS
        sameSite: "strict",
        maxAge: 60 * 60 * 1000,
      })
      .json({ mensaje: `Bienvenido, ${usuario.nombre}`, rol: usuario.rol?.nombre });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error al intentar iniciar sesión." });
  }
};

// Logout
export const logoutUsuario = (req, res) => {
  res.clearCookie("token");
  res.json({ mensaje: "Sesión cerrada correctamente." });
};
