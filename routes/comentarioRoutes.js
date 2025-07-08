const express = require('express');
const router = express.Router();
const comentarioController = require('../controllers/comentarioController');

router.get('/', comentarioController.listarComentarios);
router.get('/:id', comentarioController.buscarComentario);
router.post('/', comentarioController.cadastrarComentario);
router.delete('/:id', comentarioController.excluirComentario);
router.put('/:id', comentarioController.update);

module.exports = router;
