const pool = require('../db');

async function buscarTodasCompetenciasDeAluno(matricula) {
  const resultado = await pool.query(
    `SELECT titulo_comp FROM competencia_e_alunos WHERE matricula = $1`,
    [matricula]
  );
  return resultado.rows;
}

async function buscarTodosAlunosPorCompetencia(titulo_comp) {
  const resultado = await pool.query(
   `SELECT matricula FROM competencia_e_alunos WHERE titulo_comp ILIKE $1`,
    [titulo_comp]
  );
  return resultado.rows;
}

async function adicionarCompetenciaParaAluno(relacao) {
  const { matricula, titulo_comp } = relacao;

  await pool.query(
    `INSERT INTO competencia_e_alunos (
      matricula,
      titulo_comp
    ) VALUES ($1, $2)`,
    [matricula, titulo_comp]
  );
}

async function removerCompetenciaDeAluno(matricula, titulo_comp) {
  await pool.query(
    `DELETE FROM competencia_e_alunos WHERE matricula = $1 AND titulo_comp = $2`,
    [matricula, titulo_comp]
  );
}

module.exports = {
  buscarTodasCompetenciasDeAluno,
  buscarTodosAlunosPorCompetencia,
  adicionarCompetenciaParaAluno,
  removerCompetenciaDeAluno
};
