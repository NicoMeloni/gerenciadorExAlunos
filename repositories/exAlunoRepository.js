const pool = require('../db');

async function buscarTodosExAlunos() {
    const resultado = await pool.query('SELECT * FROM exaluno ORDER BY matricula');
    return resultado.rows;
}

async function buscarExAlunoPorId(id) {
    const resultado = await pool.query(
        'SELECT * FROM exaluno WHERE matricula = $1',
        [id]
    );
    return resultado.rows[0];
}



async function alunoValido(login_aluno){
  const { matricula } = login_aluno;
  const resultado = await pool.query(
    `SELECT matricula, nome, senha_login FROM exaluno WHERE matricula = $1`,
    [matricula]
  );
  return resultado.rows[0];
}

async function criarExAluno(exaluno) {
    const {
    matricula,
    nome,
    ira,
    data_nasc,
    email,
    linkedin,
    semestres_cursados,
    data_inicio_curso,
    data_fim_curso,
    idcurso,
    senha_login
  } = exaluno;

  await pool.query(
    `INSERT INTO exaluno (
      matricula,
      nome,
      ira,
      data_nasc,
      email,
      linkedin,
      semestres_cursados,
      data_inicio_curso,
      data_fim_curso,
      idcurso,
      senha_login
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
    [
      matricula,
      nome,
      ira,
      data_nasc,
      email,
      linkedin,
      semestres_cursados,
      data_inicio_curso,
      data_fim_curso,
      idcurso,
      senha_login
    ]
  );
}

async function atualizar(exAluno) {
  const {
    matricula, nome, ira, data_nasc, email, linkedin,
    semestres_cursados, data_inicio_curso, data_fim_curso, idcurso, senha
  } = exAluno;

  let updateQuery = `
    UPDATE exaluno SET
      nome = $1, ira = $2, data_nasc = $3, email = $4, linkedin = $5,
      semestres_cursados = $6, data_inicio_curso = $7, data_fim_curso = $8, idcurso = $9
    WHERE matricula = $10 RETURNING *;`;

  let queryParams = [
    nome, ira, data_nasc, email, linkedin,
    semestres_cursados, data_inicio_curso, data_fim_curso, idcurso, matricula
  ];

  if (senha && senha.trim() !== '') {
    updateQuery = `
      UPDATE exaluno SET
        nome = $1, ira = $2, data_nasc = $3, email = $4, linkedin = $5,
        semestres_cursados = $6, data_inicio_curso = $7, data_fim_curso = $8,
        idcurso = $9, senha_login = $10
      WHERE matricula = $11 RETURNING *;`;
    queryParams = [
      nome, ira, data_nasc, email, linkedin,
      semestres_cursados, data_inicio_curso, data_fim_curso,
      idcurso, senha, matricula
    ];
  }

  const result = await pool.query(updateQuery, queryParams);
  return result.rows[0]; 
}

async function deletarExAluno(matricula) {
  await pool.query('DELETE FROM ExAluno WHERE matricula = $1', [matricula]);
}

async function salvarImagemExaluno(matricula, imagemBuffer) {
  const query = `
    INSERT INTO fotos_exaluno (matricula, imagem)
    VALUES ($1, $2)
  `;
  await pool.query(query, [matricula, imagemBuffer]);
}

module.exports = {
    buscarTodosExAlunos,
    buscarExAlunoPorId,
    alunoValido,
    criarExAluno,
    atualizar,
    deletarExAluno,
    salvarImagemExaluno
};