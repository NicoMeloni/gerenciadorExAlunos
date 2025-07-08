const repo = require('../repositories/empregoRepository');

async function listarEmpregos(req, res) {
  const empregos = await repo.buscarTodos();
  res.json(empregos);
}

async function obterEmprego(req, res) {
  const emprego = await repo.buscarPorId(req.params.id);
  if (emprego) {
    res.json(emprego);
  } else {
    res.status(404).send('Emprego não encontrado');
  }
}

async function criarEmprego(req, res) {
  await repo.criar(req.body);
  res.status(201).send('Emprego criado com sucesso');
}

async function deletarEmprego(req, res) {
  await repo.deletar(req.params.id);
  res.send('Emprego removido com sucesso');
}

module.exports = {
  listarEmpregos,
  obterEmprego,
  criarEmprego,
  deletarEmprego
};
