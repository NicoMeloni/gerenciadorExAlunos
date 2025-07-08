const pool = require('../db');

async function buscarTodos() {
  const resultado = await pool.query('SELECT * FROM posgraduacao');
  return resultado.rows;
}

async function buscarPorId(id) {
  const resultado = await pool.query('SELECT * FROM posgraduacao WHERE id_pos = $1', [id]);
  return resultado.rows[0];
}

async function buscarPorMatricula(matricula) {
  const resultado = await pool.query('SELECT * FROM posgraduacao WHERE idexaluno = $1', [matricula]);
  return resultado.rows;
}

async function criar(pos) {
  const {
      pais,
      instituicao,
      area_pos,
      tipo,
      duracao_pos,
      data_inicio_pos,
      data_fim_pos,
      idexaluno,
  } = pos;

  await pool.query(
    `INSERT INTO posgraduacao (
      pais, instituicao, area_pos, tipo,
      duracao_pos, data_inicio_pos, data_fim_pos, idexaluno
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [
      pais, instituicao, area_pos, tipo,
      duracao_pos, data_inicio_pos, data_fim_pos, idexaluno
    ]
  );
}

async function deletar(id) {
  await pool.query('DELETE FROM PosGraduacao WHERE id_pos = $1', [id]);
}

module.exports = {
  buscarTodos,
  buscarPorId,
  buscarPorMatricula,
  criar,
  deletar
};
