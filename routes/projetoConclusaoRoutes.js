const express = require('express');
const router = express.Router();
const projetoController = require('../controllers/projetoConclusaoController');

router.get('/', projetoController.listarProjetos);
router.get('/:id', projetoController.buscarProjeto);
router.post('/', projetoController.cadastrarProjeto);
router.delete('/:id', projetoController.excluirProjeto);

module.exports = router;
