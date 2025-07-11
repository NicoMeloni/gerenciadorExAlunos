--------------PROCEDURE-------------
CREATE OR REPLACE PROCEDURE cadastrar_aluno_completo(
    p_matricula TEXT,
    p_nome TEXT,
    p_ira NUMERIC,
    p_data_nasc DATE,
    p_email TEXT,
    p_linkedin TEXT,
    p_semestres INT,
    p_inicio DATE,
    p_fim DATE,
    p_idcurso TEXT,
    p_duracaocurso INTERVAL,
    p_senha TEXT,
    p_cargo TEXT,
    p_descricao TEXT,
    p_salario NUMERIC,
    p_inicio_empr DATE,
    p_fim_empr DATE,
    p_duracao_empr INTERVAL,
    p_nome_empresa TEXT,
    p_ramo TEXT,
    p_setor TEXT
)
LANGUAGE plpgsql
AS $$
DECLARE
    empresa_id INT;
	nomecurso TEXT;
BEGIN
    SELECT id_empresa INTO empresa_id
    FROM empresa
    WHERE nome_empresa = p_nome_empresa
      AND ramo_atuacao = p_ramo
      AND setor = p_setor;
	-- verificando se a empresa inserida já existe, se não, cria uma nova
    IF empresa_id IS NULL THEN
        INSERT INTO empresa (nome_empresa, ramo_atuacao, setor)
        VALUES (p_nome_empresa, p_ramo, p_setor)
        RETURNING id_empresa INTO empresa_id;
    END IF;
	-- verificando se o curso inserido ja existe, se não, cria um novo
	IF NOT EXISTS (
	    SELECT 1 FROM curso WHERE nome_curso = p_idcurso
	) THEN
	    INSERT INTO curso (nome_curso, duracao)
	    VALUES (p_idcurso, p_duracaocurso);
	END IF;



    INSERT INTO exaluno (matricula, nome, ira, data_nasc, email, linkedin, semestres_cursados, data_inicio_curso, data_fim_curso, idcurso, senha_login)
    VALUES (p_matricula, p_nome, p_ira, p_data_nasc, p_email, p_linkedin, p_semestres, p_inicio, p_fim, p_idcurso, p_senha);

    INSERT INTO emprego (idexaluno, cargo, descr_cargo, salario, data_inicio_empr, data_fim_empr, duracao_empr, idempresa)
    VALUES (p_matricula, p_cargo, p_descricao, p_salario, p_inicio_empr, p_fim_empr, p_duracao_empr, empresa_id);
END;
$$;


----------------VIEWS---------------
CREATE OR REPLACE VIEW vw_empregos_com_nome_empresa AS
SELECT
    e.idexaluno,
    e.cargo,
    e.descr_cargo,
    e.data_inicio_empr,
    e.data_fim_empr,
    e.salario,
	e.duracao_empr,
    emp.nome_empresa
FROM
    emprego e
JOIN
    empresa emp ON e.idempresa = emp.id_empresa;

CREATE VIEW view_aluno_curso_empresa AS
SELECT 
    exaluno.nome, 
    curso.nome_curso, 
    empresa.nome_empresa
FROM 
    exaluno
JOIN 
    curso ON exaluno.idcurso = curso.nome_curso
JOIN 
    emprego ON exaluno.matricula = emprego.idexaluno
JOIN 
    empresa ON emprego.idempresa = empresa.id_empresa;
SELECT * FROM view_aluno_curso_empresa ORDER BY nome
