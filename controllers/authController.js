const cursoRepo = require('../repositories/cursoRepository');
const exAlunoRepo = require('../repositories/exAlunoRepository');
const empregoRepo = require("../repositories/empregoRepository");
const empresaRepo = require("../repositories/empresaRepository");
const projConclusaoRepo = require("../repositories/projetoConclusaoRepository");
const posGraduacaoRepo = require("../repositories/posGraduacaoRepository");
const comentarioRepo = require("../repositories/comentarioRepository");
const { activeSessions } = require("../middlewares/authMiddleware");

async function registrarExAlunoCompleto(req, res){
    try {
        const { perfil, curso, emprego, empresa } = req.body;
        
        // const nome_curso = await cursoRepo.obterOuCriarCurso(curso);
        // perfil.idcurso = nome_curso; //adicionando FK (aluno - curso)
        // await exAlunoRepo.criarExAluno(perfil);
        // console.log(emprego.descricao);

        // if (emprego && emprego.cargo) {
        //     const idempresa = await empresaRepo.obterOuCriar(empresa);
        //     emprego.idempresa = idempresa; //adicionando FK (emprego - empresa)
        //     emprego.idexaluno = perfil.matricula; //adicionando FK (emprego - aluno)
        //     await empregoRepo.criar(emprego);
        // }

        await empregoRepo.criarAlunoCompleto(req.body);
        
        res.status(201).json({ message: 'Perfil completo registrado com sucesso!' });

    } catch (err) {
        //await client.query('ROLLBACK');
        console.error('Erro na transação de registro:', err);
        if (err.code === '23505') return res.status(409).json({ error: 'Matrícula já cadastrada.' });
        if (err.code === '23503') return res.status(400).json({ error: 'Dados inválidos. Verifique se o curso ou orientador existem.' });
        res.status(500).json({ error: 'Erro interno do servidor ao registrar perfil.' });
    }
}

async function login(req, res){
    const { matricula, senha } = req.body;
    if (!matricula || !senha)
        return res.status(400).json({ error: 'Matrícula e Senha são obrigatórias.' });

    try {
        //const result = await pool.query('SELECT matricula, nome, senha_login FROM exaluno WHERE matricula = $1', [matricula]);
        const user = await exAlunoRepo.alunoValido(req.body);
        if (!user) return res.status(401).json({ error: 'Matrícula não encontrada.' });
        if (user.senha_login !== senha) return res.status(401).json({ error: 'Senha incorreta.' });

        activeSessions[matricula] = true;
        res.json({ message: 'Login bem-sucedido!', user: { matricula: user.matricula, nome: user.nome } });
    } catch (err) {
        console.error('Erro ao fazer login:', err);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}

async function perfil(req, res){
    const matriculaDoUsuarioLogado = req.userMatricula;
    try {
        const result = await exAlunoRepo.buscarExAlunoPorId(matriculaDoUsuarioLogado);
        if (!result)
            return res.status(404).json({ error: 'Perfil não encontrado.' });
        res.json(result);
    } catch (err) {
        console.error(`Erro ao buscar perfil:`, err);
        res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}

async function empregos(req, res) {
  const matricula = req.userMatricula;
  try {
    const result = await empregoRepo.buscarPorMatricula_view_nome_empresa(matricula);
    if (!result) return res.status(404).json({ error: 'Nenhuma experiência encontrada.' });
    res.json(result);
  } catch(err){
    console.error(`Erro ao procurar os empregos:`, err);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
  
}

async function detalhesPorMatricula(req, res){
    const { matricula } = req.params;
    try {
        const [perfilResult, empregosResult, projetoResult, posResult] = await Promise.all([
        //pool.query('SELECT * FROM exaluno WHERE matricula = $1', [matricula]),
        exAlunoRepo.buscarExAlunoPorId(matricula),
        // pool.query('SELECT * FROM emprego WHERE idexaluno = $1 ORDER BY data_inicio_empr DESC', [matricula]),
        empregoRepo.buscarPorMatricula_view_nome_empresa(matricula),
        // pool.query('SELECT * FROM projetoconclusao WHERE idexaluno = $1', [matricula]),
        projConclusaoRepo.buscarPorMatricula(matricula),
        // pool.query('SELECT * FROM posgraduacao WHERE idexaluno = $1', [matricula]),
        posGraduacaoRepo.buscarPorMatricula(matricula)
        ]);

        if (!perfilResult)
            return res.status(404).json({ error: 'Perfil não encontrado.' });

        res.json({
        perfil: perfilResult,
        empregos: empregosResult,
        projeto: projetoResult,
        posGraduacoes: posResult
        });
    } catch (err) {
        console.error(`Erro ao buscar detalhes:`, err);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}

async function attEmprego(req, res) {
  const id_emprego = req.params.id_emprego;
  req.body.idemprego = id_emprego;
  empregoRepo.atualizarEmprego(req.body); 
}

async function atualizarExAluno(req, res) {
  const matriculaParaAtualizar = req.params.matricula;
  const {
    nome, ira, data_nasc, email, linkedin,
    semestres_cursados, data_inicio_curso, data_fim_curso, idcurso, senha
  } = req.body;

  if (!nome || ira === undefined || !data_nasc || !email || semestres_cursados === undefined || !data_inicio_curso || !data_fim_curso || !idcurso)
    return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos.' });

  if (isNaN(ira) || ira < 0 || ira > 5)
    return res.status(400).json({ error: 'IRA deve ser entre 0 e 5.' });

  if (isNaN(semestres_cursados) || semestres_cursados < 1)
    return res.status(400).json({ error: 'Semestres cursados deve ser positivo.' });

  try {
    const exAlunoAtualizado = await exAlunoRepo.atualizar({
      matricula: matriculaParaAtualizar,
      nome, ira, data_nasc, email, linkedin,
      semestres_cursados, data_inicio_curso, data_fim_curso, idcurso, senha
    });

    if (!exAlunoAtualizado)
      return res.status(404).json({ error: 'Ex-aluno não encontrado.' });

    res.json({ message: 'Ex-aluno atualizado com sucesso!', exaluno: exAlunoAtualizado });
  } catch (err) {
    console.error('Erro ao atualizar ex-aluno:', err);
    if (err.code === '23503')
      return res.status(409).json({ error: 'ID do curso inválido.' });

    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}

module.exports = {
    registrarExAlunoCompleto,
    login,
    perfil,
    empregos,
    attEmprego,
    detalhesPorMatricula,
    atualizarExAluno
};


