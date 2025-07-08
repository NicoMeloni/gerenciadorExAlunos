// repositories/empresaRepository.js
const pool = require('../db');

async function buscarTodasEmpresas() {
  const resultado = await pool.query('SELECT * FROM empresa');
  return resultado.rows;
}

async function buscarEmpresaPorId(id) {
  const resultado = await pool.query(
    'SELECT * FROM empresa WHERE id_empresa = $1',
    [id]
  );
  return resultado.rows[0];
}

async function buscarPorNome(nome) {
  const resultado = await pool.query(
    `SELECT * FROM empresa WHERE nome_empresa = $1`,
    [nome]
  );
  return resultado.rows[0]; // retorna `undefined` se não existir
}

async function obterOuCriar(empresa) {
  const { nome_empresa, ramo_atuacao, setor } = empresa;
  const empresaExistente = await buscarPorNome(nome_empresa);
  if (empresaExistente) {
    return empresaExistente.id_empresa;
  }
  const resultado = await pool.query(
        'INSERT INTO empresa (nome_empresa, ramo_atuacao, setor) VALUES ($1, $2, $3) RETURNING id_empresa',
        [nome_empresa, ramo_atuacao, setor]
    );
  return resultado.rows[0].id_empresa;
}

async function obterNomesEmpresas(matricula) {
  const resultado = await pool.query(
    `SELECT nome_empresa FROM aluno_empresas WHERE matricula = $1`, [matricula]
  );
  

}

async function atualizarEmpresa(empresa) {
  const { nome_empresa, ramo_atuacao, setor } = empresa;
  const emp = buscarPorNome(nome_empresa);
  if (emp) {
    await pool.query(
    `UPDATE empresa SET nome_empresa = $1, ramo_atuacao = $2, setor = $3 WHERE id_empresa = $4`,
    [nome_empresa, ramo_atuacao, setor, emp.idempresa]
    );
  }  
}

async function criarEmpresa(empresa) {
  const { nome_empresa, ramo_atuacao, setor } = empresa;
  await pool.query(
    'INSERT INTO empresa (nome_empresa, ramo_atuacao, setor) VALUES ($1, $2, $3)',
    [nome_empresa, ramo_atuacao, setor]
  );
}

async function deletarEmpresa(id) {
  await pool.query('DELETE FROM empresa WHERE id_empresa = $1', [id]);
}

module.exports = {
  buscarTodasEmpresas,
  buscarEmpresaPorId,
  buscarPorNome,
  obterOuCriar,
  obterNomesEmpresas,
  atualizarEmpresa,
  criarEmpresa,
  deletarEmpresa
};
