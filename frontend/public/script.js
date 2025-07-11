document.addEventListener('DOMContentLoaded', () => {
    // --- SELETORES DE ELEMENTOS DO DOM ---
    const editAlunoForm = document.getElementById('edit-aluno-form');
    const editEmpresaForm = document.getElementById('editar-empresa');
    const alunosTableBody = document.querySelector('#alunos-table tbody');
    const editFormMessage = document.getElementById('edit-form-message');
    const listMessage = document.getElementById('list-message');
    const profileTabContent = document.getElementById('ver-perfil');

    const navLinks = document.querySelectorAll('.navbar nav ul li a, .login-link');
    const tabContents = document.querySelectorAll('.tab-content');

    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginMessage = document.getElementById('login-message');
    const registerMessage = document.getElementById('register-message');
    const authStatusMessage = document.getElementById('auth-status-message');

    const botaoNovaEmpresa = document.getElementById('btn-nova-empresa');
    if (botaoNovaEmpresa) {
        botaoNovaEmpresa.addEventListener('click', () => {
        document.getElementById('nova-empresa-campos').style.display = 'block';
        document.getElementById('register-empresa-id').value = '';
        });
    }

    // --- ESTADO DA APLICAÇÃO ---
    let userMatricula = null;

    // --- FUNÇÕES AUXILIARES ---
    function showMessage(element, msg, type) {
        element.textContent = msg;
        element.className = `message ${type}`;
        setTimeout(() => {
            element.textContent = '';
            element.className = 'message';
        }, 4000);
    }

    function formatDateForInput(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // --- FUNÇÕES DE LÓGICA PRINCIPAL ---
    function showTab(tabId) {
        tabContents.forEach(content => content.classList.remove('active'));
        const activeTab = document.getElementById(tabId);
        if (activeTab) activeTab.classList.add('active');
        navLinks.forEach(link => {
            link.classList.remove('active-tab');
            if (link.dataset.tab === tabId) link.classList.add('active-tab');
        });
        if (tabId === 'ver-ex-alunos') fetchAlunos();
    }

    function updateTabVisibility() {
        const editarAlunoLink = document.querySelector('[data-tab="editar-aluno"]');
        const cadastroLoginLink = document.querySelector('[data-tab="cadastro"]');
        const verExpProfissionalLink = document.querySelector('[data-tab="exp-profissional"]');
        if (userMatricula) {
            editarAlunoLink.style.display = 'block';
            verExpProfissionalLink.style.display = 'block';
            cadastroLoginLink.style.display = 'none';
            authStatusMessage.textContent = `Você está logado como: ${userMatricula}`;
            authStatusMessage.className = 'message success';
        } else {
            editarAlunoLink.style.display = 'none';
            verExpProfissionalLink.style.display = 'none';
            cadastroLoginLink.style.display = 'block';
            authStatusMessage.textContent = 'Faça login para gerenciar seu perfil.';
            authStatusMessage.className = 'message';
        }
    }

    async function populateMyEmpForm() {
        if (!userMatricula) return;
        try {
            const response = await fetch('/api/me/empregos', { headers: { 'Authorization': userMatricula } });
            if (!response.ok) throw new Error('Falha ao buscar dados para edição.');
            const empregos = await response.json();
            
            showTab('exp-profissional');
            const empregosList = document.getElementById('empregos-list');
            empregosList.innerHTML = ''; // limpa antes de inserir novos

            empregos.forEach(emprego => {
                const empregoDiv = document.createElement('div');
                empregoDiv.className = 'item-listado'; // ou use sua própria classe de estilo

                const dataInicio = new Date(emprego.data_inicio_empr).toLocaleDateString('pt-BR');
                const dataFim = emprego.data_fim_empr ? new Date(emprego.data_fim_empr).toLocaleDateString('pt-BR') : 'Atual';

                empregoDiv.innerHTML = `
                    <h4>${emprego.cargo} - ${emprego.nome_empresa}</h4>
                    <p>${dataInicio} - ${dataFim}</p>
                    <p>Salário: R$ ${parseFloat(emprego.salario).toFixed(2)}</p>
                    <p>${emprego.descricao}</p>
                `;
                empregosList.appendChild(empregoDiv);
            });

        } catch (error) {
            showMessage(editFormMessage, 'Não foi possível carregar seus dados para edição.', 'error');
        }
    }

    async function populateMyEditForm() {
        if (!userMatricula) return;
        try {
            const response = await fetch('/api/me/profile', { headers: { 'Authorization': userMatricula } });
            if (!response.ok) throw new Error('Falha ao buscar dados para edição.');
            const aluno = await response.json();
            document.getElementById('edit-matricula').value = aluno.matricula || '';
            document.getElementById('edit-nome').value = aluno.nome || '';
            document.getElementById('edit-ira').value = aluno.ira !== null ? parseFloat(aluno.ira) : '';
            document.getElementById('edit-data-nasc').value = formatDateForInput(aluno.data_nasc);
            document.getElementById('edit-email').value = aluno.email || '';
            document.getElementById('edit-linkedin').value = aluno.linkedin || '';
            document.getElementById('edit-semestres-cursados').value = aluno.semestres_cursados !== null ? aluno.semestres_cursados : '';
            document.getElementById('edit-data-inicio-curso').value = formatDateForInput(aluno.data_inicio_curso);
            document.getElementById('edit-data-fim-curso').value = formatDateForInput(aluno.data_fim_curso);
            document.getElementById('edit-idcurso').value = aluno.idcurso || '';
            document.getElementById('edit-senha').value = '';
            showTab('editar-aluno');
        } catch (error) {
            showMessage(editFormMessage, 'Não foi possível carregar seus dados para edição.', 'error');
        }
    }

    async function fetchAndDisplayProfile(matricula) {
        showTab('ver-perfil');
        profileTabContent.innerHTML = '<div class="message">Carregando perfil...</div>';
        try {
            const response = await fetch(`/api/exaluno/${matricula}/detalhes`);
            if (!response.ok) throw new Error('Perfil não encontrado.');
            const data = await response.json();
            profileTabContent.innerHTML = '';
            const backButton = document.createElement('button');
            backButton.textContent = '‹ Voltar para a Lista';
            backButton.style.marginBottom = '20px';
            backButton.addEventListener('click', () => showTab('ver-ex-alunos'));
            profileTabContent.appendChild(backButton);
            const profileContainer = document.createElement('div');
            profileContainer.className = 'profile-content';
            const dataInicio = new Date(data.perfil.data_inicio_curso).toLocaleDateString('pt-BR');
            const dataFim = new Date(data.perfil.data_fim_curso).toLocaleDateString('pt-BR');
            profileContainer.innerHTML = `
                <div class="profile-header"><h2>${data.perfil.nome}</h2><p>Matrícula: ${data.perfil.matricula}</p><p>Email: <a href="mailto:${data.perfil.email}">${data.perfil.email}</a></p><p>LinkedIn: <a href="${data.perfil.linkedin}" target="_blank">${data.perfil.linkedin || 'Não informado'}</a></p></div>
                <div class="profile-section"><h3>Informações Acadêmicas</h3><p><strong>Curso:</strong> ${data.perfil.idcurso}</p><p><strong>Período:</strong> ${dataInicio} - ${dataFim}</p><p><strong>IRA:</strong> ${parseFloat(data.perfil.ira).toFixed(2)}</p><p><strong>Projeto de Conclusão:</strong> ${data.projeto?.titulo_proj || 'Não informado'}</p></div>
                <div class="profile-section"><h3>Histórico Profissional</h3><div id="empregos-list"></div></div>`;
            profileTabContent.appendChild(profileContainer);
            const empregosList = document.getElementById('empregos-list');
            if (data.empregos && data.empregos.length > 0) {
                data.empregos.forEach(emprego => {
                    const empregoDiv = document.createElement('div');
                    empregoDiv.className = 'item-listado';
                    empregoDiv.innerHTML = `<h4>${emprego.cargo} na ${emprego.nome_empresa
                         || 'Empresa não informada'}</h4><p>${new Date(emprego.data_inicio_empr).toLocaleDateString('pt-BR')} - ${emprego.data_fim_empr ? new Date(emprego.data_fim_empr).toLocaleDateString('pt-BR') : 'Atual'}</p>`;
                    empregosList.appendChild(empregoDiv);
                });
            } else {
                empregosList.innerHTML = '<p>Nenhum histórico profissional cadastrado.</p>';
            }
        } catch (error) {
            profileTabContent.innerHTML = `<div class="message error">Erro ao carregar o perfil. <a href="#" id="back-link">Voltar para a lista</a>.</div>`;
            document.getElementById('back-link').addEventListener('click', (e) => { e.preventDefault(); showTab('ver-ex-alunos'); });
        }
    }

    async function carregarEmpresas() {
        try {
            const res = await fetch('/empresas'); 
            const empresas = await res.json();

            const select = document.getElementById('register-empresa-id');
            empresas.forEach(empresa => {
            const option = document.createElement('option');
            option.value = empresa.id;
            option.textContent = empresa.nome;
            select.appendChild(option);
            });
        } catch (err) {
            console.error('Erro ao carregar empresas:', err);
        }
        }


    async function fetchAlunos() {
        try {
            const response = await fetch('/exalunos');
            if (!response.ok) throw new Error('Erro de rede.');
            const alunos = await response.json();
            alunosTableBody.innerHTML = '';
            alunos.forEach(aluno => {
                const row = alunosTableBody.insertRow();
                row.insertCell(0).textContent = aluno.nome || 'N/A';
                row.insertCell(1).textContent = aluno.matricula || 'N/A';
                row.insertCell(2).textContent = aluno.ira !== null ? parseFloat(aluno.ira).toFixed(2) : 'N/A';
                row.insertCell(3).textContent = aluno.data_nasc ? new Date(aluno.data_nasc).toLocaleDateString('pt-BR') : 'N/A';
                row.insertCell(4).textContent = aluno.email || 'N/A';
                row.insertCell(5).textContent = aluno.linkedin || 'N/A';
                row.insertCell(6).textContent = aluno.semestres_cursados !== null ? aluno.semestres_cursados : 'N/A';
                row.insertCell(7).textContent = aluno.data_inicio_curso ? new Date(aluno.data_inicio_curso).toLocaleDateString('pt-BR') : 'N/A';
                row.insertCell(8).textContent = aluno.data_fim_curso ? new Date(aluno.data_fim_curso).toLocaleDateString('pt-BR') : 'N/A';
                row.insertCell(9).textContent = aluno.idcurso || 'N/A';
                const actionsCell = row.insertCell(10);
                const perfilButton = document.createElement('button');
                perfilButton.textContent = 'Ver Perfil';
                perfilButton.classList.add('action-button');
                perfilButton.addEventListener('click', () => fetchAndDisplayProfile(aluno.matricula));
                actionsCell.appendChild(perfilButton);
            });
        } catch (error) {
            showMessage(listMessage, 'Erro ao carregar ex-alunos. Tente novamente.', 'error');
        }
    }

    // --- EVENT LISTENERS ---
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const tabId = event.target.dataset.tab;
            if (tabId === 'editar-aluno' && userMatricula) {
                populateMyEditForm();
            } else if (tabId === 'ver-ex-alunos' || tabId === 'cadastro') {
                showTab(tabId);
            } else if (tabId === 'editar-aluno' && !userMatricula) {
                showMessage(authStatusMessage, 'Você precisa estar logado para editar seu perfil.', 'error');
            } else if(tabId === 'exp-profissional' && userMatricula) {
                populateMyEmpForm();
            } else if(tabId === 'exp-profissional' && !userMatricula) {
                showMessage(authStatusMessage, 'Você precisa estar logado para editar seu perfil.', 'error');
            }
        });
    });

    // Listener de Login COM DEPURAÇÃO
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        console.log('Botão de login clicado. Iniciando requisição...'); // Log 1
        const matricula = document.getElementById('login-matricula').value;
        const senha = document.getElementById('login-senha').value;
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ matricula, senha })
            });
            console.log('Resposta do servidor recebida. Status:', response.status); // Log 2
            const data = await response.json();
            console.log('Dados da resposta (JSON):', data); // Log 3
            if (response.ok) {
                console.log('Login bem-sucedido (response.ok é true). Atualizando UI...'); // Log 4
                userMatricula = matricula;
                showMessage(loginMessage, 'Login bem-sucedido!', 'success');
                loginForm.reset();
                updateTabVisibility();
                showTab('ver-ex-alunos');
            } else {
                console.error('Falha no login (response.ok é false). Mensagem do servidor:', data.error); // Log 5
                showMessage(loginMessage, data.error || 'Erro no login.', 'error');
            }
        } catch (error) {
            console.error('Erro de exceção no fetch de login:', error); // Log 6
            showMessage(loginMessage, 'Erro de conexão ou JSON inválido. Tente novamente.', 'error');
        }
    });

    document.getElementById('deletar-exaluno').addEventListener('click', async () => {
        if (!userMatricula) {
            alert("Nenhum aluno logado.");
            return;
        }

        const confirmacao = confirm("Tem certeza que deseja excluir permanentemente seu perfil?");
        if (!confirmacao) return;

        try {
            const response = await fetch(`/exalunos/${userMatricula}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': userMatricula
                }
            });

            if (response.ok) {
                alert("Perfil excluído com sucesso.");
                userMatricula = null; // limpa a variável de login
                showTab('cadastro'); // volta para a tela de login
            } else {
                alert("Erro ao excluir o perfil.");
            }
        } catch (err) {
            console.error(err);
            alert("Erro inesperado ao excluir o perfil.");
        }
    });

    document.getElementById('salvarImagemBtn').addEventListener('click', async () => {
        const input = document.getElementById('imagem');
        const file = input.files[0];
        if (!file) {
            alert("Selecione uma imagem primeiro.");
            return;
        }

        const formData = new FormData();
        formData.append('imagem', file);

        try {
            const response = await fetch('/api/upload-imagem', {
                method: 'POST',
                headers: {
                    'Authorization': userMatricula  
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error('Erro ao enviar a imagem.');
            }

            alert('Imagem enviada com sucesso!');
        } catch (error) {
            console.error('Erro ao enviar a imagem:', error);
            alert('Erro ao enviar a imagem.');
        }
    });

    
    editAlunoForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const matricula = document.getElementById('edit-matricula').value;
        const bodyPayload = {
            nome: document.getElementById('edit-nome').value,
            ira: parseFloat(document.getElementById('edit-ira').value),
            data_nasc: document.getElementById('edit-data-nasc').value,
            email: document.getElementById('edit-email').value,
            linkedin: document.getElementById('edit-linkedin').value,
            semestres_cursados: parseInt(document.getElementById('edit-semestres-cursados').value),
            data_inicio_curso: document.getElementById('edit-data-inicio-curso').value,
            data_fim_curso: document.getElementById('edit-data-fim-curso').value,
            idcurso: document.getElementById('edit-idcurso').value,
            senha: document.getElementById('edit-senha').value
        };
        try {
            const response = await fetch(`/api/exaluno/${matricula}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': userMatricula },
                body: JSON.stringify(bodyPayload)
            });
            const data = await response.json();
            if (response.ok) {
                showMessage(editFormMessage, 'Perfil atualizado com sucesso!', 'success');
                showTab('ver-ex-alunos');
            } else {
                showMessage(editFormMessage, data.error || 'Erro ao atualizar perfil.', 'error');
            }
        } catch (error) {
            showMessage(editFormMessage, 'Erro de conexão ao tentar atualizar.', 'error');
        }
    });

    // Listener para o formulário de Registro (versão completa)
    registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Coleta todos os dados e os agrupa em objetos
    const registrationData = {
        perfil: {
            matricula: document.getElementById('register-matricula').value,
            senha_login: document.getElementById('register-senha').value,
            nome: document.getElementById('register-nome-completo').value,
            data_nasc: document.getElementById('register-data_nasc').value,
            email: document.getElementById('register-email').value,
            linkedin: document.getElementById('register-linkedin').value,
            semestres_cursados: parseInt(document.getElementById('register-semestres-cursados').value),
            data_inicio_curso: document.getElementById('register-data-inicio-curso').value,
            data_fim_curso: document.getElementById('register-data-fim-curso').value,
            ira: parseFloat(document.getElementById('register-ira').value)
        },
        curso: {
            nome_curso: document.getElementById('register-idcurso').value,
            duracao: document.getElementById('register-duracao-curso').value
        },
        emprego: {
            descricao: document.getElementById('register-emprego-descricao').value,
            cargo: document.getElementById('register-emprego-cargo').value,
            inicio: document.getElementById('register-emprego-inicio').value,
            fim: document.getElementById('register-emprego-fim').value || null, // Envia null se estiver vazio
            salario: parseFloat(document.getElementById('register-emprego-salario').value),
        },
        empresa: {
            nome_empresa: document.getElementById('register-empresa-nome').value,
            ramo_atuacao: document.getElementById('register-empresa-ramo').value,
            setor: document.getElementById('register-empresa-setor').value,
        }
    };
    
    // Limpa seções opcionais que não foram preenchidas para não enviar dados vazios
    if (!registrationData.emprego.cargo) registrationData.emprego = null;
    if (!registrationData.empresa.nome_empresa) registrationData.empresa = null;

    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(registrationData)
        });
        const data = await response.json();
        if (response.ok) {
            showMessage(registerMessage, 'Perfil completo registrado com sucesso! Faça o login.', 'success');
            registerForm.reset();
            showTab('cadastro');
        } else {
            showMessage(registerMessage, data.error || 'Erro ao registrar.', 'error');
        }
    } catch (error) {
        showMessage(registerMessage, 'Erro de conexão ao tentar registrar.', 'error');
    }
});

    // --- INICIALIZAÇÃO ---
    updateTabVisibility();
    showTab('ver-ex-alunos');
});