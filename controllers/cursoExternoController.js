const cursosExternosRepository = require('../repositories/cursoExternoRepository');

async function listarCursosExternos(req, res) {
  try {
    const cursos = await cursosExternosRepository.buscarTodosCursosExternos();
    res.json(cursos);
  } catch (error) {
    console.error('Erro ao listar cursos externos:', error);
    res.status(500).json({ mensagem: 'Erro ao buscar cursos externos' });
  }
}

async function buscarCursoExterno(req, res) {
  try {
    const { id } = req.params;
    const curso = await cursosExternosRepository.buscarCursoExternoPorId(id);

    if (!curso) {
      return res.status(404).json({ mensagem: 'Curso externo não encontrado' });
    }

    res.json(curso);
  } catch (error) {
    console.error('Erro ao buscar curso externo:', error);
    res.status(500).json({ mensagem: 'Erro ao buscar curso externo' });
  }
}

async function cadastrarCursoExterno(req, res) {
  try {
    const novoCurso = req.body;
    await cursosExternosRepository.criarCursoExterno(novoCurso);
    res.status(201).json({ mensagem: 'Curso externo cadastrado com sucesso' });
  } catch (error) {
    console.error('Erro ao cadastrar curso externo:', error);
    res.status(500).json({ mensagem: 'Erro ao cadastrar curso externo' });
  }
}

async function excluirCursoExterno(req, res) {
  try {
    const { id } = req.params;
    await cursosExternosRepository.deletarCursoExterno(id);
    res.json({ mensagem: 'Curso externo excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir curso externo:', error);
    res.status(500).json({ mensagem: 'Erro ao excluir curso externo' });
  }
}

module.exports = {
  listarCursosExternos,
  buscarCursoExterno,
  cadastrarCursoExterno,
  excluirCursoExterno
};
