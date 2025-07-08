const repo = require('../repositories/empresaRepository');

async function listarEmpresas(req, res) {
  const empresas = await repo.buscarTodasEmpresas();
  res.json(empresas);
}

async function obterEmpresa(req, res) {
  const id = req.params.id;
  const empresa = await repo.buscarEmpresaPorId(id);
  if (empresa) {
    res.json(empresa);
  } else {
    res.status(404).send('Empresa não encontrada');
  }
}



async function atualizarEmpresa(req, res) {
  try {
    const empresa = req.body;
    await repo.atualizarEmpresa(empresa);
  } catch(e){
    console.error('Erro ao atualizar empresa:', error);
    res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
}

async function criar(req, res) {
  try {
    const novaEmpresa = req.body;

    const empresaExistente = await empresaRepo.buscarPorNome(novaEmpresa.nome_empresa);
    if (empresaExistente) {
      return res.status(400).json({ mensagem: 'Empresa já cadastrada com esse nome.' });
    }

    await empresaRepo.criar(novaEmpresa);
    res.status(201).json({ mensagem: 'Empresa cadastrada com sucesso!' });

  } catch (error) {
    console.error('Erro ao criar empresa:', error);
    res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
}

async function deletar(req, res) {
  const id = req.params.id;
  await repo.deletarEmpresa(id);
  res.send('Empresa deletada');
}

module.exports = {
  listarEmpresas,
  obterEmpresa,
  atualizarEmpresa,
  criar,
  deletar
};
