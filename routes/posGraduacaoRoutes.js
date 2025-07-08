const express = require('express');
const router = express.Router();
const controller = require('../controllers/posGraduacaoController');

router.get('/', controller.listarPosGraduacoes);
router.get('/:id', controller.obterPosGraduacao);
router.post('/', controller.criarPosGraduacao);
router.delete('/:id', controller.deletarPosGraduacao);

module.exports = router;
