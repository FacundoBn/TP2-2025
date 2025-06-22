import Vehiculo from '../models/Vehiculo.js';

export const crearVehiculo = async (req, res) => {
  try {
    const { patente, marca, modelo } = req.body;
    const vehiculo = await Vehiculo.create({ patente, marca, modelo });
    res.status(201).json(vehiculo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const obtenerVehiculos = async (req, res) => {
  try {
    const vehiculos = await Vehiculo.findAll();
    res.status(200).json(vehiculos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerVehiculoPorPatente = async (req, res) => {
  try {
    const { patente } = req.params;
    const vehiculo = await Vehiculo.findByPk(patente);
    if (!vehiculo) {
      return res.status(404).json({ error: 'Vehículo no encontrado' });
    }
    res.status(200).json(vehiculo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const eliminarVehiculo = async (req, res) => {
  try {
    const { patente } = req.params;
    const eliminado = await Vehiculo.destroy({ where: { patente } });
    if (!eliminado) {
      return res.status(404).json({ error: 'Vehículo no encontrado' });
    }
    res.status(200).json({ mensaje: 'Vehículo eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
