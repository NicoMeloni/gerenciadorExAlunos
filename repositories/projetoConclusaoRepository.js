const pool = require('../db');

async function buscarTodosProjetos() {
  const resultado = await pool.query('SELECT * FROM projetoconclusao');
  return resultado.rows;
}

async function buscarProjetoPorId(id) {
  const resultado = await pool.query(
    'SELECT * FROM projetoconclusao WHERE id_proj = $1',
    [id]
  );
  return resultado.rows[0];
}

async function buscarPorMatricula(matricula) {
  const resultado = await pool.query('SELECT * FROM projetoconclusao WHERE idexaluno = $1', [matricula]);
  return resultado.rows[0];
}

async function criarProjeto(projeto) {
  const {
    titulo_proj,
    area_proj,
    nota,
    idexaluno,
    idorientador
  } = projeto;

  await pool.query(
    `INSERT INTO projetoconclusao (
      titulo_proj,
      area_proj,
      nota,
      idexaluno,
      idorientador
    ) VALUES ($1, $2, $3, $4, $5)`,
    [
      titulo_proj,
      area_proj,
      nota,
      idexaluno,
      idorientador
    ]
  );
}

async function deletarProjeto(id) {
  await pool.query('DELETE FROM projetoconclusao WHERE id_proj = $1', [id]);
}

module.exports = {
  buscarTodosProjetos,
  buscarProjetoPorId,
  buscarPorMatricula,
  criarProjeto,
  deletarProjeto
};
