const express = require('express');
const router = express.Router();
const ocupacionCtrl = require('../controllers/ocupacion.controller');

router.post('/ingresar', ocupacionCtrl.ingresarVehiculo);
router.put('/salir/:id', ocupacionCtrl.salirVehiculo);
router.get('/activos', ocupacionCtrl.listarActivos);
router.get('/inactivos', ocupacionCtrl.listarInactivos);

module.exports = router;

