const competenciaRepository = require('../repositories/competenciaRepository');

async function listarCompetencias(req, res) {
  try {
    const competencias = await competenciaRepository.buscarTodasCompetencias();
    res.json(competencias);
  } catch (error) {
    console.error('Erro ao listar competências:', error);
    res.status(500).json({ mensagem: 'Erro ao buscar competências' });
  }
}

async function buscarCompetencia(req, res) {
  try {
    const { titulo } = req.params;
    const competencia = await competenciaRepository.buscarCompetenciaPorTitulo(titulo);

    if (!competencia) {
      return res.status(404).json({ mensagem: 'Competência não encontrada' });
    }

    res.json(competencia);
  } catch (error) {
    console.error('Erro ao buscar competência:', error);
    res.status(500).json({ mensagem: 'Erro ao buscar competência' });
  }
}

async function cadastrarCompetencia(req, res) {
  try {
    const novaCompetencia = req.body;
    await competenciaRepository.criarCompetencia(novaCompetencia);
    res.status(201).json({ mensagem: 'Competência cadastrada com sucesso' });
  } catch (error) {
    console.error('Erro ao cadastrar competência:', error);
    res.status(500).json({ mensagem: 'Erro ao cadastrar competência' });
  }
}

async function excluirCompetencia(req, res) {
  try {
    const { titulo } = req.params;
    await competenciaRepository.deletarCompetencia(titulo);
    res.json({ mensagem: 'Competência excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir competência:', error);
    res.status(500).json({ mensagem: 'Erro ao excluir competência' });
  }
}

module.exports = {
  listarCompetencias,
  buscarCompetencia,
  cadastrarCompetencia,
  excluirCompetencia
};
