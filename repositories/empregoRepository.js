const pool = require('../db');

async function buscarTodos() {
  const resultado = await pool.query('SELECT * FROM Emprego');
  return resultado.rows;
}

async function buscarPorId(id) {
  const resultado = await pool.query('SELECT * FROM Emprego WHERE id_emprego = $1', [id]);
  return resultado.rows[0];
}

async function buscarPorMatricula(matricula){
  const resultado = await pool.query('SELECT * FROM emprego WHERE idexaluno = $1 ORDER BY data_inicio_empr DESC', [matricula]);
  return resultado.rows;
}

async function criarAlunoCompleto(tudo) {
  const { perfil, curso, emprego, empresa } = tudo;
  const intervalo = calcularIntervalo(emprego.inicio, emprego.fim);
  await pool.query(
    `CALL cadastrar_aluno_completo(
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
            $11::interval, $12, $13, $14, $15, $16, $17, $18::interval,
            $19, $20, $21
        );`,
      [perfil.matricula, perfil.nome, perfil.ira, perfil.data_nasc, perfil.email, perfil.linkedin,
        perfil.semestres_cursados, perfil.data_inicio_curso, perfil.data_fim_curso, curso.nome_curso, curso.duracao,
        perfil.senha_login, emprego.cargo, emprego.descricao, emprego.salario, emprego.inicio, emprego.fim, intervalo,
        empresa.nome_empresa, empresa.ramp_atuacao, empresa.setor
      ]
  );
}

async function buscarPorMatricula_view_nome_empresa(matricula){
  const resultado = await pool.query('SELECT * FROM vw_empregos_com_nome_empresa WHERE idexaluno = $1 ORDER BY data_inicio_empr DESC', [matricula]);
  return resultado.rows;
}

const dayjs = require('dayjs');

function calcularIntervalo(inicio, fim) {
    const start = dayjs(inicio);
    const end = fim ? dayjs(fim) : dayjs();

    const anos = end.diff(start, 'year');
    const meses = end.diff(start.add(anos, 'year'), 'month');

    return `${anos} years ${meses} months`;
}

async function atualizarEmprego(emprego) {
  const {      
        idemprego,
        descricao,
        cargo,
        data_inicio_empr,
        data_fim_empr,
        salario,
        idexaluno,
 } = emprego;
  
  const intervalo = calcularIntervalo(data_inicio_empr, data_fim_empr);
  await pool.query(
    `UPDATE emprego SET descr_cargo = $1, cargo = $2, data_inicio_empr = $3, data_fim_empr = $4, salario = $5, duracao_empr = $6 WHERE id_emprego = $7`,
    [descricao, cargo, data_inicio_empr, data_fim_empr, salario, intervalo, idemprego]
  );
    
}

async function criar(emprego) {
  const {
    descricao,
    cargo,
    inicio,
    fim,
    salario,
    duracao_empr,
    idexaluno,
    idempresa
  } = emprego;
  
  const intervalo = calcularIntervalo(inicio, fim);


  await pool.query(`
    INSERT INTO emprego (
        descr_cargo,
        cargo,
        data_inicio_empr,
        data_fim_empr,
        salario,
        duracao_empr,
        idexaluno,
        idempresa
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  `, [descricao,
    cargo,
    inicio,
    fim,
    salario,
    intervalo,
    idexaluno,  
    idempresa]);
}

async function deletar(id) {
  await pool.query('DELETE FROM emprego WHERE id_emprego = $1', [id]);
}

module.exports = {
  buscarTodos,
  buscarPorId,
  buscarPorMatricula,
  criarAlunoCompleto,
  buscarPorMatricula_view_nome_empresa,
  atualizarEmprego,
  criar,
  deletar
};
