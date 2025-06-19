import Estacionamiento from "../models/Estacionamiento.js";

// Obtener todos los estacionamientos
export const getEstacionamientos = async (req, res) => {
  try {
    const estacionamientos = await Estacionamiento.findAll();
    res.json(estacionamientos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener estacionamientos." });
  }
};

// Crear un nuevo estacionamiento
export const createEstacionamiento = async (req, res) => {
  const { piso, numero, estado } = req.body;

  try {
    const nuevo = await Estacionamiento.create({ piso, numero, estado });
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ error: "Error al crear el estacionamiento." });
  }
};

// Actualizar un estacionamiento
export const updateEstacionamiento = async (req, res) => {
  const { id } = req.params;
  const { piso, numero, estado } = req.body;

  try {
    const estac = await Estacionamiento.findByPk(id);
    if (!estac) return res.status(404).json({ error: "Estacionamiento no encontrado." });

    await estac.update({ piso, numero, estado });
    res.json(estac);
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar el estacionamiento." });
  }
};

// Eliminar un estacionamiento
export const deleteEstacionamiento = async (req, res) => {
  const { id } = req.params;

  try {
    const estac = await Estacionamiento.findByPk(id);
    if (!estac) return res.status(404).json({ error: "Estacionamiento no encontrado." });

    await estac.destroy();
    res.json({ mensaje: "Estacionamiento eliminado." });
  } catch (error) {
    res.status(400).json({ error: "Error al eliminar el estacionamiento." });
  }
};
