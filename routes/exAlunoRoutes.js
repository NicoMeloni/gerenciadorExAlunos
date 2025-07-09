const express = require('express');
const router = express.Router();
const controller = require('../controllers/exAlunoController');
const { authenticateToken } = require('../middlewares/authMiddleware');


router.get('/', controller.listarExAlunos);
router.get('/:id', controller.obterExAluno);
router.post('/', controller.criar);
router.delete('/:id', authenticateToken, controller.deletar);

module.exports = router;