import express from 'express';
import {
  crearVehiculo,
  obtenerVehiculos,
  obtenerVehiculoPorPatente,
  eliminarVehiculo
} from '../controllers/vehiculoController.js';

const router = express.Router();

router.post('/', crearVehiculo);
router.get('/', obtenerVehiculos);
router.get('/:patente', obtenerVehiculoPorPatente);
router.delete('/:patente', eliminarVehiculo);

export default router;
