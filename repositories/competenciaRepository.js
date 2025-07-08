const pool = require('../db');

async function buscarTodasCompetencias() {
  const resultado = await pool.query('SELECT * FROM competencia');
  return resultado.rows;
}

async function buscarCompetenciaPorTitulo(titulo) {
  const resultado = await pool.query(
    'SELECT * FROM competencia WHERE titulo_comp = $1',
    [titulo]
  );
  return resultado.rows[0];
}

async function criarCompetencia(competencia) {
  const { titulo_comp, descr_comp } = competencia;

  await pool.query(
    `INSERT INTO competencia (
      titulo_comp,
      descr_comp
    ) VALUES ($1, $2)`,
    [titulo_comp, descr_comp]
  );
}

async function deletarCompetencia(titulo) {
  await pool.query('DELETE FROM competencia WHERE titulo_comp = $1', [titulo]);
}

module.exports = {
  buscarTodasCompetencias,
  buscarCompetenciaPorTitulo,
  criarCompetencia,
  deletarCompetencia
};
