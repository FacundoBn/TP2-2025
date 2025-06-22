import Ocupacion from "../models/Ocupacion.js";
import Vehiculo from "../models/Vehiculo.js";
import Lugar from "../models/Estacionamiento.js";
import { Op } from "sequelize";

// 🚗 Ingreso de vehículo
export const ingresarVehiculo = async (req, res) => {
  try {
    const { patente } = req.body;

    // lo buscamos:
    const yaIngresado = await Ocupacion.findOne({
      where: { patente, hora_salida: null },
    });
    if (yaIngresado) {
      return res.status(400).json({ mensaje: "El vehículo ya está dentro del estacionamiento" });
    }

    // si no lo encontramos buscamos un lugar
    const lugar = await Lugar.findOne({ where: { estado: "disponible" } });
    if (!lugar) {
      return res.status(400).json({ mensaje: "No hay lugares disponibles" });
    }

    // si hay "lugar" creamos una ocupación y la asignamos al vehículo
    const ocupacion = await Ocupacion.create({
      patente,
      lugar_id: lugar.id,
      hora_entrada: new Date(),
    });

    // cambiamos el estado del lugar
    await lugar.update({ estado: "ocupado" });

    res.status(201).json(ocupacion);
  } catch (error) {
    res.status(500).json({ mensaje: "Error en el ingreso", error });
  }
};

// 🚪 Salida de vehículo
export const salirVehiculo = async (req, res) => {
  try {
    const { id } = req.params;
    const ocupacion = await Ocupacion.findByPk(id);

    // validamos si existe la hora de salida de dicha ocupación o si no existe la misma
    if (!ocupacion || ocupacion.hora_salida) {
      return res.status(404).json({ mensaje: "Ocupación no encontrada o ya finalizada" });
    }

    // la creamos y asignamos la hora de salida
    const horaSalida = new Date();
    const horaEntrada = new Date(ocupacion.hora_entrada);
    const horas = Math.ceil((horaSalida - horaEntrada) / (1000 * 60 * 60));
    const tarifa = horas * 1000;

    await ocupacion.update({ hora_salida: horaSalida });

    const lugar = await Lugar.findByPk(ocupacion.lugar_id);
    await lugar.update({ estado: "disponible" });

    res.json({ mensaje: "Salida registrada", horas, tarifa });
  } catch (error) {
    res.status(500).json({ mensaje: "Error en la salida", error });
  }
};

// 📋 Lista de ocupaciones activas
export const listarActivos = async (req, res) => {
  try {
    const ocupaciones = await Ocupacion.findAll({
      where: { hora_salida: null },
      include: [Vehiculo, Lugar],
    });
    res.json(ocupaciones);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener ocupaciones activas", error });
  }
};

// 📋 Lista de ocupaciones inactivas
export const listarInactivos = async (req, res) => {
  try {
    const ocupaciones = await Ocupacion.findAll({
      where: { hora_salida: { [Ocupacion.sequelize.Op.not]: null } },
      include: [Vehiculo, Lugar],
    });
    res.json(ocupaciones);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener ocupaciones inactivas", error });
  }
};

// Salida por patente
export const salirVehiculoPorPatente = async (req, res) => {
  const { patente } = req.params;

  try {
    const ocupacion = await Ocupacion.findOne({
      where: {
        patente,
        hora_salida: {
          [Op.is]: null
        }
      }
    });

    if (!ocupacion) {
      return res.status(404).json({ mensaje: "No se encontró una ocupación activa para esa patente." });
    }

    const ahora = new Date();
    ocupacion.hora_salida = ahora;
    await ocupacion.save();

    const entrada = new Date(ocupacion.hora_entrada);
    const duracionHoras = Math.ceil((ahora - entrada) / (1000 * 60 * 60));
    const tarifa = duracionHoras * 1000;

    const lugar = await Lugar.findByPk(ocupacion.lugar_id);
    if (lugar) {
      lugar.estado = "disponible";
      await lugar.save();
    }

    return res.json({
      mensaje: "Salida registrada",
      horas: duracionHoras,
      tarifa
    });

  } catch (error) {
    console.error("Error en salida por patente:", error);
    return res.status(500).json({
      mensaje: "Error en la salida por patente",
      error: error.message || error
    });
  }
};


