const express = require('express');
const router = express.Router();
const cursosExternosController = require('../controllers/cursoExternoController');

router.get('/', cursosExternosController.listarCursosExternos);
router.get('/:id', cursosExternosController.buscarCursoExterno);
router.post('/', cursosExternosController.cadastrarCursoExterno);
router.delete('/:id', cursosExternosController.excluirCursoExterno);

module.exports = router;
