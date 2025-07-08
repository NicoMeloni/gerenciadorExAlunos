const pool = require('../db');

async function buscarTodosOrientadores() {
  const resultado = await pool.query('SELECT * FROM orientador');
  return resultado.rows;
}

async function buscarOrientadorPorMatricula(matricula) {
  const resultado = await pool.query(
    'SELECT * FROM orientador WHERE matricula = $1',
    [matricula]
  );
  return resultado.rows[0];
}

async function criarOrientador(orientador) {
  const { matricula, nome_ori, departamento } = orientador;

  await pool.query(
    `INSERT INTO orientador (
      matricula,
      nome_ori,
      departamento
    ) VALUES ($1, $2, $3)`,
    [matricula, nome_ori, departamento]
  );
}

async function deletarOrientador(matricula) {
  await pool.query('DELETE FROM orientador WHERE matricula = $1', [matricula]);
}

module.exports = {
  buscarTodosOrientadores,
  buscarOrientadorPorMatricula,
  criarOrientador,
  deletarOrientador
};
