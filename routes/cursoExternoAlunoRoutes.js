const express = require('express');
const router = express.Router();
const cursoAlunoController = require('../controllers/cursoExternoAlunoController');

router.get('/:matricula', cursoAlunoController.listarCursosDoAluno);
router.get('/alunos/:id_curs_ext', cursoAlunoController.listarAlunosPorCurso);
router.post('/', cursoAlunoController.vincularCurso);
router.delete('/:matricula/:id_curs_ext', cursoAlunoController.desvincularCurso);

module.exports = router;
