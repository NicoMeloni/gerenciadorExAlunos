const express = require('express');
const router = express.Router();
const orientadorController = require('../controllers/orientadorController');

router.get('/', orientadorController.listarOrientadores);
router.get('/:matricula', orientadorController.buscarOrientador);
router.post('/', orientadorController.cadastrarOrientador);
router.delete('/:matricula', orientadorController.excluirOrientador);

module.exports = router;
