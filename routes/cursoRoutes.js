const express = require('express');
const router = express.Router();
const controller = require('../controllers/cursoController');

router.get('/', controller.listarCursos);
router.get('/:id', controller.obterCurso);
router.post('/', controller.criar);
router.delete('/:id', controller.deletar);

module.exports = router;