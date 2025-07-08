const pool = require('../db');

async function buscarTodosCursosExternos() {
  const resultado = await pool.query('SELECT * FROM cursosexternos');
  return resultado.rows;
}

async function buscarCursoExternoPorId(id) {
  const resultado = await pool.query(
    'SELECT * FROM cursosexternos WHERE id_curs_ext = $1',
    [id]
  );
  return resultado.rows[0];
}

async function criarCursoExterno(curso) {
  const {
    nome_curs_ext,
    instituicao,
    duracao_curs_ext,
    descr_curs_ext
  } = curso;

  await pool.query(
    `INSERT INTO cursosexternos (
      nome_curs_ext,
      instituicao,
      duracao_curs_ext,
      descr_curs_ext
    ) VALUES ($1, $2, $3, $4)`,
    [
      nome_curs_ext,
      instituicao,
      duracao_curs_ext,
      descr_curs_ext
    ]
  );
}

async function deletarCursoExterno(id) {
  await pool.query('DELETE FROM cursosexternos WHERE id_curs_ext = $1', [id]);
}

module.exports = {
  buscarTodosCursosExternos,
  buscarCursoExternoPorId,
  criarCursoExterno,
  deletarCursoExterno
};
