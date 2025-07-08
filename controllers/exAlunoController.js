const repo = require('../repositories/exAlunoRepository');

async function listarExAlunos(req, res){
    const exalunos = await repo.buscarTodosExAlunos();
    res.json(exalunos);
}

async function obterExAluno(req, res) {
    const id = req.params.id;
    const exaluno = await repo.buscarExAlunoPorId(id);
    if(exaluno) {
        res.json(exaluno);
    } else {
        res.status(404).send('Ex-aluno não encontrado');
    }
}


async function criar(req, res) {
    await repo.criarExAluno(req.body);
    res.status(201).send('Ex-aluno criado com sucesso');
}

async function deletar(req, res) {
    const id = req.params.id;
    await repo.deletarExAluno(id);
    res.send('Ex-aluno deletado'); 
}

module.exports = {
    listarExAlunos,
    obterExAluno,
    criar,
    deletar
};