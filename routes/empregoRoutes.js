const express = require('express');
const router = express.Router();
const controller = require('../controllers/empregoController');

router.get('/', controller.listarEmpregos);
router.get('/:id', controller.obterEmprego);
router.post('/', controller.criarEmprego);
router.delete('/:id', controller.deletarEmprego);

module.exports = router;
