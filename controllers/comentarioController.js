const comentarioRepository = require('../repositories/comentarioRepository');

async function listarComentarios(req, res) {
  try {
    const comentarios = await comentarioRepository.buscarTodosComentarios();
    res.json(comentarios);
  } catch (error) {
    console.error('Erro ao listar comentários:', error);
    res.status(500).json({ mensagem: 'Erro ao buscar comentários' });
  }
}

async function buscarComentario(req, res) {
  try {
    const { id } = req.params;
    const comentario = await comentarioRepository.buscarComentarioPorId(id);

    if (!comentario) {
      return res.status(404).json({ mensagem: 'Comentário não encontrado' });
    }

    res.json(comentario);
  } catch (error) {
    console.error('Erro ao buscar comentário:', error);
    res.status(500).json({ mensagem: 'Erro ao buscar comentário' });
  }
}

async function cadastrarComentario(req, res) {
  try {
    const novoComentario = req.body;
    await comentarioRepository.criarComentario(novoComentario);
    res.status(201).json({ mensagem: 'Comentário cadastrado com sucesso' });
  } catch (error) {
    console.error('Erro ao cadastrar comentário:', error);
    res.status(500).json({ mensagem: 'Erro ao cadastrar comentário' });
  }
}

async function excluirComentario(req, res) {
  try {
    const { id } = req.params;
    await comentarioRepository.deletarComentario(id);
    res.json({ mensagem: 'Comentário excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir comentário:', error);
    res.status(500).json({ mensagem: 'Erro ao excluir comentário' });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const { texto } = req.body;
    await comentarioRepository.update(id, texto);
    res.json({mensagem: 'Comentário atualizado com sucesso'});
  } catch (error) {
    console.error('Erro ao atualizar comentário:', error);
    res.status(500).json({mensagem: 'Erro ao atualizar comentário'});
  }
}

module.exports = {
  listarComentarios,
  buscarComentario,
  cadastrarComentario,
  excluirComentario,
  update
};
