const express = require('express');
const router = express.Router();
const relacaoController = require('../controllers/competenciaAlunoController');

router.get('/:matricula', relacaoController.listarCompetenciasDoAluno);
router.get('/alunos/:titulo_comp', relacaoController.listarAlunosPorCompetencia);
router.post('/', relacaoController.vincularCompetencia);
router.delete('/:matricula/:titulo_comp', relacaoController.desvincularCompetencia);

module.exports = router;
