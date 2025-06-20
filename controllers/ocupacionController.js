    const { Ocupacion, Vehiculo, Lugar } = require('../models');

exports.ingresarVehiculo = async (req, res) => {
  try {
    const { patente } = req.body;
//llo buscamos:
    const yaIngresado = await Ocupacion.findOne({
      where: { patente , hora_salida: null },
    });
    if (yaIngresado) {
      return res.status(400).json({ mensaje: 'El vehículo ya está dentro del estacionamiento' });
    }
// si no lo encontramos buscamos un lugarr
    const lugar = await Lugar.findOne({ where: { estado: 'disponible' } });
    if (!lugar) {
      return res.status(400).json({ mensaje: 'No hay lugares disponibles' });
    }
//si hay "lugar" creamos una ocupacion y la asignamos al vehiculo.
    const ocupacion = await Ocupacion.create({
      patente,
      lugar_id: lugar.id,
      hora_entrada: new Date(),
    });
//cambiamos el estado del lugar
    await lugar.update({ estado: 'ocupado' });

    res.status(201).json(ocupacion);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el ingreso', error });
  }
};

exports.salirVehiculo = async (req, res) => {
  try {
    const { id } = req.params;
    const ocupacion = await Ocupacion.findByPk(id);
// validamos si existe la hora de salida de dicha ocupacion o si no existe la misma.
    if (!ocupacion || ocupacion.hora_salida) {
      return res.status(404).json({ mensaje: 'Ocupación no encontrada o ya finalizada' });
    }
//la creamos y asignamos la hora de salida
    const horaSalida = new Date();
    const horaEntrada = new Date(ocupacion.hora_entrada);
    const horas = Math.ceil((horaSalida - horaEntrada) / (1000 * 60 * 60));
    const tarifa = horas * 1000;

    await ocupacion.update({ hora_salida: horaSalida });

    const lugar = await Lugar.findByPk(ocupacion.lugar_id);
    await lugar.update({ estado: 'disponible' });

    res.json({ mensaje: 'Salida registrada', horas, tarifa });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en la salida', error });
  }
};
//lista de ocupaciones activas.
exports.listarActivos = async (req, res) => {
  try {
    const ocupaciones = await Ocupacion.findAll({
      where: { hora_salida: null , hora_entrada: true ,disponible: false },
      include: ['Vehiculo', 'Lugar']
    });
    res.json(ocupaciones);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener ocupaciones activas', error });
  }
};


//lista de ocupaciones  disponibles.
exports.listarInactivos = async (req, res) => {
  try {
    const ocupaciones = await Ocupacion.findAll({
      where: { hora_entrada: null , disponible: true },
      include: ['Vehiculo', 'Lugar']
    });
    res.json(ocupaciones);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener ocupaciones inactivas', error });
  }
};
