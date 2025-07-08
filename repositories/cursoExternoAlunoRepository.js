const pool = require('../db');

async function buscarCursosExternosDoAluno(matricula) {
  const resultado = await pool.query(
    `SELECT * FROM curso_ext_e_alunos WHERE matricula = $1`,
    [matricula]
  );
  return resultado.rows;
}

async function buscarAlunosPorCursoExterno(id_curs_ext) {
  const resultado = await pool.query(
    `SELECT * FROM curso_ext_e_alunos WHERE id_curs_ext = $1`,
    [id_curs_ext]
  );
  return resultado.rows;
}

async function adicionarCursoExternoParaAluno(relacao) {
  const {
    matricula,
    id_curs_ext,
    data_fim_curs_ext,
    duracao_curs_ext,
    data_inicio_curs_ext
  } = relacao;

  await pool.query(
    `INSERT INTO curso_ext_e_alunos (
      matricula,
      id_curs_ext,
      data_fim_curs_ext,
      duracao_curs_ext,
      data_inicio_curs_ext
    ) VALUES ($1, $2, $3, $4, $5)`,
    [matricula, id_curs_ext, data_fim_curs_ext, duracao_curs_ext, data_inicio_curs_ext]
  );
}

async function removerCursoExternoDoAluno(matricula, id_curs_ext) {
  await pool.query(
    `DELETE FROM curso_ext_e_alunos WHERE matricula = $1 AND id_curs_ext = $2`,
    [matricula, id_curs_ext]
  );
}

module.exports = {
  buscarCursosExternosDoAluno,
  buscarAlunosPorCursoExterno,
  adicionarCursoExternoParaAluno,
  removerCursoExternoDoAluno
};
