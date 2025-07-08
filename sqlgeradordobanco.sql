CREATE TABLE Curso (
    nome_curso VARCHAR(100) PRIMARY KEY,
    duracao INTERVAL
);

CREATE TABLE ExAluno (
    matricula VARCHAR(20) PRIMARY KEY,
    nome VARCHAR(100),
    ira NUMERIC(4,2),
    data_nasc DATE,
    email VARCHAR(100),
    linkedin VARCHAR(150),
    semestres_cursados INTEGER,
    data_inicio_curso DATE,
    data_fim_curso DATE,
    idCurso VARCHAR(100),
    senha_login VARCHAR(50),
    FOREIGN KEY (idCurso) REFERENCES Curso(nome_curso)
);

CREATE TABLE CursosExternos (
    id_curs_ext SERIAL PRIMARY KEY,
    nome_curs_ext VARCHAR(100),
    instituicao VARCHAR(100),
    duracao_curs_ext INTERVAL,
    descr_curs_ext TEXT
);

CREATE TABLE curs_ext_e_aluno (
    matricula VARCHAR(20),
    id_curs_ext INTEGER,
    data_fim_curs_ext DATE,
    data_inicio_crus_ext DATE,
    duracao_curs_ext INTERVAL,
    PRIMARY KEY (matricula, id_curs_ext),
    FOREIGN KEY (matricula) REFERENCES ExAluno(matricula),
    FOREIGN KEY (id_curs_ext) REFERENCES CursosExternos(id_curs_ext)
);

CREATE TABLE Empresa (
    id_empresa SERIAL PRIMARY KEY,
    nome_empresa VARCHAR(100),
    ramo_atuacao VARCHAR(100),
    setor VARCHAR(50)
);

CREATE TABLE Emprego (
    id_emprego SERIAL PRIMARY KEY,
    descr_cargo TEXT,
    cargo VARCHAR(50),
    data_inicio_empr DATE,
    data_fim_empr DATE,
    salario NUMERIC(10,2),
    duracao_empr INTERVAL,
    idExAluno VARCHAR(20),
    idEmpresa INTEGER,
    FOREIGN KEY (idExAluno) REFERENCES ExAluno(matricula),
    FOREIGN KEY (idEmpresa) REFERENCES Empresa(id_empresa)
);

CREATE TABLE Orientador (
    matricula VARCHAR(20) PRIMARY KEY,
    nome_ori VARCHAR(100),
    departamento VARCHAR(100)
);

CREATE TABLE ProjetoConclusao (
    id_proj SERIAL PRIMARY KEY,
    titulo_proj VARCHAR(100),
    area_proj VARCHAR(100),
    nota NUMERIC(4,2),
    idExAluno VARCHAR(20),
    idOrientador VARCHAR(20),
    FOREIGN KEY (idExAluno) REFERENCES ExAluno(matricula),
    FOREIGN KEY (idOrientador) REFERENCES Orientador(matricula)
);

CREATE TABLE PosGraduacao (
    id_pos VARCHAR(30) PRIMARY KEY,
    pais VARCHAR(50),
    instituicao VARCHAR(100),
    area_pos VARCHAR(100),
    tipo VARCHAR(50),
    duracao_pos INTERVAL,
    data_inicio_pos DATE,
    data_fim_pos DATE,
    idExAluno VARCHAR(20),
    FOREIGN KEY (idExAluno) REFERENCES ExAluno(matricula)
);

CREATE TABLE Competencia (
    titulo_comp VARCHAR(100) PRIMARY KEY,
    descr_comp TEXT
);

CREATE TABLE competencia_e_aluno (
    matricula VARCHAR(20),
    titulo_comp VARCHAR(100),
    PRIMARY KEY (matricula, titulo_comp),
    FOREIGN KEY (matricula) REFERENCES ExAluno(matricula),
    FOREIGN KEY (titulo_comp) REFERENCES Competencia(titulo_comp)
);

CREATE TABLE Comentario (
    id_coment SERIAL PRIMARY KEY,
    texto TEXT,
    data_coment DATE,
    idExAluno VARCHAR(20),
    FOREIGN KEY (idExAluno) REFERENCES ExAluno(matricula)
);
