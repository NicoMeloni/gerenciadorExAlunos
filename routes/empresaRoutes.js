// routes/empresaRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/empresaController');

router.get('/', controller.listarEmpresas);
router.get('/:id', controller.obterEmpresa);
router.post('/', controller.criar);
router.delete('/:id', controller.deletar);

module.exports = router;
