const projetoRepository = require('../repositories/projetoConclusaoRepository');

async function listarProjetos(req, res) {
  try {
    const projetos = await projetoRepository.buscarTodosProjetos();
    res.json(projetos);
  } catch (error) {
    console.error('Erro ao listar projetos:', error);
    res.status(500).json({ mensagem: 'Erro ao buscar projetos' });
  }
}

async function buscarProjeto(req, res) {
  try {
    const { id } = req.params;
    const projeto = await projetoRepository.buscarProjetoPorId(id);

    if (!projeto) {
      return res.status(404).json({ mensagem: 'Projeto não encontrado' });
    }

    res.json(projeto);
  } catch (error) {
    console.error('Erro ao buscar projeto:', error);
    res.status(500).json({ mensagem: 'Erro ao buscar projeto' });
  }
}

async function cadastrarProjeto(req, res) {
  try {
    const novoProjeto = req.body;
    await projetoRepository.criarProjeto(novoProjeto);
    res.status(201).json({ mensagem: 'Projeto cadastrado com sucesso' });
  } catch (error) {
    console.error('Erro ao cadastrar projeto:', error);
    res.status(500).json({ mensagem: 'Erro ao cadastrar projeto' });
  }
}

async function excluirProjeto(req, res) {
  try {
    const { id } = req.params;
    await projetoRepository.deletarProjeto(id);
    res.json({ mensagem: 'Projeto excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir projeto:', error);
    res.status(500).json({ mensagem: 'Erro ao excluir projeto' });
  }
}

module.exports = {
  listarProjetos,
  buscarProjeto,
  cadastrarProjeto,
  excluirProjeto
};
