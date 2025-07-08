const repo = require('../repositories/posGraduacaoRepository');

async function listarPosGraduacoes(req, res) {
  const dados = await repo.buscarTodos();
  res.json(dados);
}

async function obterPosGraduacao(req, res) {
  const pos = await repo.buscarPorId(req.params.id);
  if (pos) {
    res.json(pos);
  } else {
    res.status(404).send("Pós-graduação não encontrada");
  }
}

async function criarPosGraduacao(req, res) {
  await repo.criar(req.body);
  res.status(201).send("Pós-graduação criada com sucesso");
}

async function deletarPosGraduacao(req, res) {
  await repo.deletar(req.params.id);
  res.send("Pós-graduação removida com sucesso");
}

module.exports = {
  listarPosGraduacoes,
  obterPosGraduacao,
  criarPosGraduacao,
  deletarPosGraduacao
};
