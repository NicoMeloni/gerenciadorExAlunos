const pool = require('../db');

async function buscarTodosCursos() {
    const resultado = await pool.query('SELECT * FROM curso');
    return resultado.rows;
}

async function buscarCursoPorId(id) {
    const resultado = await pool.query(
        'SELECT * FROM curso WHERE nome_curso = $1',
        [id]
    );
    return resultado.rows[0];
}

async function obterOuCriarCurso(curso) {
    const { nome_curso, duracao } = curso;
    const cursoExistente = await buscarCursoPorId(nome_curso);
    
    if (cursoExistente) {
        return cursoExistente.nome_curso; 
    }

    const resultado = await pool.query(
        'INSERT INTO curso (nome_curso, duracao) VALUES ($1, $2) RETURNING nome_curso',
        [nome_curso, duracao]
    );

    return resultado.rows[0].nome_curso;
}


async function criarCurso(curso) {
    const { nome_curso, duracao } = curso;
    await pool.query(
        'INSERT INTO curso (nome_curso, duracao) VALUES ($1, $2)',
        [nome_curso, duracao]
    );
}

async function deletarCurso(id) {
    await pool.query('DELETE FROM curso WHERE nome_curso = $1', [id]);  
}

module.exports = {
    buscarTodosCursos,
    buscarCursoPorId,
    obterOuCriarCurso,
    criarCurso,
    deletarCurso
};