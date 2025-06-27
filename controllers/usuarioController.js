import Usuario from "../models/Usuario.js";
import { generarToken } from "../utils/token.js";


// Crear usuario
export const crearUsuario = async (req, res) => {
  const { nombre, email, password, rol } = req.body;

  if (
    !nombre || !email || !password || !rol ||
    nombre.trim() === "" || email.trim() === "" || password.trim() === "" || rol.trim() === ""
  ) {
    return res.status(400).json({ error: "Todos los campos son obligatorios y no pueden estar vacíos." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Formato de email inválido." });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: "La contraseña debe tener al menos 6 caracteres." });
  }

  const rolesValidos = ["admin", "operador"];
  if (!rolesValidos.includes(rol.toLowerCase())) {
    return res.status(400).json({ error: "Rol inválido. Debe ser 'admin' u 'operador'." });
  }

  try {
    const nuevoUsuario = await Usuario.create({ nombre, email, password, rol });
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(400).json({ error: "Ya existe un usuario con ese email." });
    } else {
      res.status(500).json({ error: "Error al crear el usuario." });
    }
  }
};

// Listar usuarios
export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: { exclude: ["password"] },
    });
    res.json(usuarios);
  } catch (error) {
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
  const { nombre, email, password, rol } = req.body;

  if (
    !nombre || !email || !password || !rol ||
    nombre.trim() === "" || email.trim() === "" || password.trim() === "" || rol.trim() === ""
  ) {
    return res.status(400).json({ error: "Todos los campos son obligatorios y no pueden estar vacíos." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Formato de email inválido." });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: "La contraseña debe tener al menos 6 caracteres." });
  }

  const rolesValidos = ["admin", "operador"];
  if (!rolesValidos.includes(rol.toLowerCase())) {
    return res.status(400).json({ error: "Rol inválido. Debe ser 'admin' u 'operador'." });
  }

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    if (email !== usuario.email) {
      const emailExistente = await Usuario.findOne({ where: { email } });
      if (emailExistente) {
        return res.status(400).json({ error: "Ya existe un usuario con ese email." });
      }
    }

    await usuario.update({ nombre, email, password, rol });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el usuario." });
  }
};

// Login de usuario (sin token todavía)
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password || email.trim() === "" || password.trim() === "") {
    return res.status(400).json({ error: "Email y contraseña son obligatorios y no pueden estar vacíos." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Formato de email inválido." });
  }

  try {
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario || usuario.password !== password) {
      return res.status(401).json({ error: "Credenciales inválidas." });
    }

    const payload = {
  id: usuario.id,
  email: usuario.email,
  rol: usuario.rol,
};

const token = generarToken(payload); // <- Nombre correcto

res.json({
  mensaje: `Bienvenido, ${usuario.nombre}.`,
  token,
});


  } catch (error) {
    res.status(500).json({ error: "Error al intentar iniciar sesión." });
  }
};
