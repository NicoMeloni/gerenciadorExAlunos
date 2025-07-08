const express = require('express');
const router = express.Router();
const competenciaController = require('../controllers/competenciaController');

router.get('/', competenciaController.listarCompetencias);
router.get('/:titulo', competenciaController.buscarCompetencia);
router.post('/', competenciaController.cadastrarCompetencia);
router.delete('/:titulo', competenciaController.excluirCompetencia);

module.exports = router;
