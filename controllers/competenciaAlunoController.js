const relacaoRepository = require('../repositories/competenciaAlunoRepository');

async function listarCompetenciasDoAluno(req, res) {
  try {
    const { matricula } = req.params;
    const competencias = await relacaoRepository.buscarTodasCompetenciasDeAluno(matricula);
    res.json(competencias);
  } catch (error) {
    console.error('Erro ao buscar competências do aluno:', error);
    res.status(500).json({ mensagem: 'Erro ao buscar competências' });
  }
}

async function listarAlunosPorCompetencia(req, res) {
  try {
    const { titulo_comp } = req.params;
    const alunos = await relacaoRepository.buscarTodosAlunosPorCompetencia(titulo_comp);
    res.json(alunos);
  } catch (error) {
    console.error('Erro ao buscar alunos:', error);
    res.status(500).json({ mensagem: 'Erro ao buscar alunos' });
  }
}

async function vincularCompetencia(req, res) {
  try {
    const relacao = req.body;
    await relacaoRepository.adicionarCompetenciaParaAluno(relacao);
    res.status(201).json({ mensagem: 'Competência vinculada com sucesso' });
  } catch (error) {
    console.error('Erro ao vincular competência:', error);
    res.status(500).json({ mensagem: 'Erro ao vincular competência' });
  }
}

async function desvincularCompetencia(req, res) {
  try {
    const { matricula, titulo_comp } = req.params;
    await relacaoRepository.removerCompetenciaDeAluno(matricula, titulo_comp);
    res.json({ mensagem: 'Competência removida com sucesso' });
  } catch (error) {
    console.error('Erro ao remover competência:', error);
    res.status(500).json({ mensagem: 'Erro ao remover competência' });
  }
}

module.exports = {
  listarCompetenciasDoAluno,
  listarAlunosPorCompetencia,
  vincularCompetencia,
  desvincularCompetencia
};
