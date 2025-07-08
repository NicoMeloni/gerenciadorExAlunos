const express = require('express');
const router = express.Router();
const controller = require('../controllers/exAlunoController');

router.get('/', controller.listarExAlunos);
router.get('/:id', controller.obterExAluno);
router.post('/', controller.criar);
router.delete('/:id', controller.deletar);

module.exports = router;