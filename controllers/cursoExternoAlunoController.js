const cursoAlunoRepository = require('../repositories/cursoExternoAlunoRepository');

async function listarCursosDoAluno(req, res) {
  try {
    const { matricula } = req.params;
    const cursos = await cursoAlunoRepository.buscarCursosExternosDoAluno(matricula);
    res.json(cursos);
  } catch (error) {
    console.error('Erro ao listar cursos do aluno:', error);
    res.status(500).json({ mensagem: 'Erro ao listar cursos externos do aluno' });
  }
}

async function listarAlunosPorCurso(req, res) {
  try {
    const { id_curs_ext } = req.params;
    const alunos = await cursoAlunoRepository.buscarAlunosPorCursoExterno(id_curs_ext);
    res.json(alunos);
  } catch (error) {
    console.error('Erro ao listar alunos do curso:', error);
    res.status(500).json({ mensagem: 'Erro ao listar alunos do curso externo' });
  }
}

async function vincularCurso(req, res) {
  try {
    const dados = req.body;
    await cursoAlunoRepository.adicionarCursoExternoParaAluno(dados);
    res.status(201).json({ mensagem: 'Curso externo vinculado com sucesso' });
  } catch (error) {
    console.error('Erro ao vincular curso externo:', error);
    res.status(500).json({ mensagem: 'Erro ao vincular curso externo' });
  }
}

async function desvincularCurso(req, res) {
  try {
    const { matricula, id_curs_ext } = req.params;
    await cursoAlunoRepository.removerCursoExternoDoAluno(matricula, id_curs_ext);
    res.json({ mensagem: 'Curso externo desvinculado com sucesso' });
  } catch (error) {
    console.error('Erro ao desvincular curso externo:', error);
    res.status(500).json({ mensagem: 'Erro ao desvincular curso externo' });
  }
}

module.exports = {
  listarCursosDoAluno,
  listarAlunosPorCurso,
  vincularCurso,
  desvincularCurso
};
