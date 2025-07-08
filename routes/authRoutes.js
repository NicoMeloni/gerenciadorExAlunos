const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.post('/register', authController.registrarExAlunoCompleto);
router.post('/login', authController.login);
router.get('/me/profile', authenticateToken, authController.perfil);
router.get('/exaluno/:matricula/detalhes', authController.detalhesPorMatricula);
router.put('/exaluno/:matricula', authenticateToken, authController.atualizarExAluno);
router.get('/me/empregos', authenticateToken, authController.empregos);
router.put('/empregos/:id_emprego', authController.attEmprego);
module.exports = router;
