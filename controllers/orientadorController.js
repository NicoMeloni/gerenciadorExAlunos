const orientadorRepository = require('../repositories/orientadorRepository');

async function listarOrientadores(req, res) {
  try {
    const orientadores = await orientadorRepository.buscarTodosOrientadores();
    res.json(orientadores);
  } catch (error) {
    console.error('Erro ao listar orientadores:', error);
    res.status(500).json({ mensagem: 'Erro ao buscar orientadores' });
  }
}

async function buscarOrientador(req, res) {
  try {
    const { matricula } = req.params;
    const orientador = await orientadorRepository.buscarOrientadorPorMatricula(matricula);

    if (!orientador) {
      return res.status(404).json({ mensagem: 'Orientador não encontrado' });
    }

    res.json(orientador);
  } catch (error) {
    console.error('Erro ao buscar orientador:', error);
    res.status(500).json({ mensagem: 'Erro ao buscar orientador' });
  }
}

async function cadastrarOrientador(req, res) {
  try {
    const novoOrientador = req.body;
    await orientadorRepository.criarOrientador(novoOrientador);
    res.status(201).json({ mensagem: 'Orientador cadastrado com sucesso' });
  } catch (error) {
    console.error('Erro ao cadastrar orientador:', error);
    res.status(500).json({ mensagem: 'Erro ao cadastrar orientador' });
  }
}

async function excluirOrientador(req, res) {
  try {
    const { matricula } = req.params;
    await orientadorRepository.deletarOrientador(matricula);
    res.json({ mensagem: 'Orientador excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir orientador:', error);
    res.status(500).json({ mensagem: 'Erro ao excluir orientador' });
  }
}

module.exports = {
  listarOrientadores,
  buscarOrientador,
  cadastrarOrientador,
  excluirOrientador
};
