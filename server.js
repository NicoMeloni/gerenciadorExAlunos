const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const host = 'http://localhost:3000';

const cursoRoutes = require('./routes/cursoRoutes');
const empresaRoutes = require('./routes/empresaRoutes');
const exAlunoRoutes = require('./routes/exAlunoRoutes');
const empregoRoutes = require('./routes/empregoRoutes');
const posGraduacaoRoutes = require('./routes/posGraduacaoRoutes');
const competenciaRoutes = require('./routes/competenciaRoutes');
const comentarioRoutes = require('./routes/comentarioRoutes');
const cursoExternoRoutes = require('./routes/cursoExternoRoutes');
const projetoConclusaoRoutes = require('./routes/projetoConclusaoRoutes');
const orientadorRoutes = require('./routes/orientadorRoutes');
const competenciaAlunoRoutes = require('./routes/competenciaAlunoRoutes');
const cursoExternoAlunoRoutes = require('./routes/cursoExternoAlunoRoutes');
const authRoutes = require('./routes/authRoutes');

app.use(express.static(path.join(__dirname, '../frontend/public')));
app.use(cors({credentials: true, origin: host}));
app.use(express.json());
app.use('/cursos', cursoRoutes);
app.use('/empresas', empresaRoutes);
app.use('/exalunos', exAlunoRoutes);
app.use('/empregos', empregoRoutes);
app.use('/posgraduacao', posGraduacaoRoutes);
app.use('/competencias', competenciaRoutes);
app.use('/comentarios', comentarioRoutes);
app.use('/cursosexternos', cursoExternoRoutes);
app.use('/projetosconclusao', projetoConclusaoRoutes);
app.use('/orientadores', orientadorRoutes);
app.use('/competencia-aluno', competenciaAlunoRoutes);
app.use('/cursoexterno-aluno', cursoExternoAlunoRoutes);
app.use('/api', authRoutes);

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});