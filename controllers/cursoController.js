const repo = require('../repositories/cursoRepository');

async function listarCursos(req, res) {
    const cursos = await repo.buscarTodosCursos();
    res.json(cursos);
}

async function obterCurso(req, res) {
    const id = req.params.id;
    const curso = await repo.buscarCursoPorId(id);
    if (curso) {
        res.json(curso);
    } else {
        res.status(404).send('Curso não encontrado');
    }
}

async function criar(req, res) {
    await repo.criarCurso(req.body);
    res.status(201).send('Curso criado com sucesso');
}

async function deletar(req, res) {
    const id = req.params.id;
    await repo.deletarCurso(id);
    res.send('Curso deletado');    
}

module.exports = {
    listarCursos,
    obterCurso,
    criar,
    deletar
};