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
  try {
    const { piso, numero, estado } = req.body;


    // Verificar si ya existe un lugar con ese piso y número
    const existe = await Estacionamiento.findOne({ where: { piso, numero } });
    if (existe) {
      return res.status(409).json({ error: "Ya existe un estacionamiento con ese piso y número." });
    }

    // Crear nuevo estacionamiento
    const nuevoEstacionamiento = await Estacionamiento.create({
      piso: Number(piso),
      numero: Number(numero),
      estado: estado || "disponible",
    });

    res.status(201).json(nuevoEstacionamiento);
  } catch (error) {
    console.error("Error al crear estacionamiento:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Actualizar un estacionamiento
export const updateEstacionamiento = async (req, res) => {
  const { id } = req.params;
  const { piso, numero, estado } = req.body;

  try {
    const estac = await Estacionamiento.findByPk(id);
    if (!estac) {
      return res.status(404).json({ error: "Estacionamiento no encontrado." });
    }

    await estac.update({
      piso: Number(piso),
      numero: Number(numero),
      estado: estado || estac.estado,
    });

    res.json(estac);
  } catch (error) {
    console.error("Error al actualizar estacionamiento:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};


// Eliminar un estacionamiento
export const deleteEstacionamiento = async (req, res) => {
  const { id } = req.params;


  try {
    const estac = await Estacionamiento.findByPk(id);
    if (!estac) {
      return res.status(404).json({ error: "Estacionamiento no encontrado." });
    }

    if (estac.estado === "ocupado") {
      return res.status(400).json({
        error: "No se puede eliminar un estacionamiento que está ocupado.",
      });
    }

    await estac.destroy();
    res.json({ mensaje: "Estacionamiento eliminado correctamente." });
  } catch (error) {
    console.error("Error al eliminar estacionamiento:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};
