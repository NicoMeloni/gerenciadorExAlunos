const pool = require('../db');

//Ver
async function buscarTodosComentarios() {
  const resultado = await pool.query('SELECT * FROM comentario');
  return resultado.rows;
}

async function buscarComentarioPorId(id) {
  const resultado = await pool.query(
    'SELECT * FROM comentario WHERE id_coment = $1',
    [id]
  );
  return resultado.rows[0];
}

async function criarComentario(comentario) {
  const { texto, data_coment, idexaluno } = comentario;

  await pool.query(
    `INSERT INTO comentario (
      texto,
      NOW(),
      idexaluno
    ) VALUES ($1, $2)`,
    [texto, idexaluno]
  );
}

async function deletarComentario(id) {
  await pool.query('DELETE FROM comentario WHERE id_coment = $1', [id]);
}

async function update(id, texto) {
  await pool.query(
    `UPDATE comentario
      SET texto = $1
      WHERE id_coment = $2`,
    [texto, id]
  );
}

module.exports = {
  buscarTodosComentarios,
  buscarComentarioPorId,
  criarComentario,
  deletarComentario,
  update
};
