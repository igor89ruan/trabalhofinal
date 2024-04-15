const formularioBeneficiario = document.getElementById('formBeneficiario');

window.onload = buscarBeneficiario;

document.getElementById('btnRegistrar').addEventListener('click', function(event) {
    event.preventDefault(); // Impede a submissão padrão do formulário
    validarBeneficiario(event, 'cadastro'); // Chama a função de validação com 'cadastro'
});


function validarBeneficiario(evento, operacao = 'atualizacao') {
    if (formularioBeneficiario.checkValidity()) {
        formularioBeneficiario.classList.remove('was-validated');
        const nome = document.getElementById('nome').value;
        const cpf = document.getElementById('cpf').value;
        const contato = document.getElementById('contato').value;
        const endereco = document.getElementById('endereco').value;
        const bairro = document.getElementById('bairro').value;
        const numero = document.getElementById('numero').value;
        const datanascimento = document.getElementById('datanascimento').value;

        const beneficiario = { nome, cpf, contato, endereco, bairro, numero, datanascimento };
        
        if (operacao === 'cadastro') {
            cadastrarBeneficiario(beneficiario);
        } else if (operacao === 'atualizacao') {
            return beneficiario; 
        }
    }
    else {
        formularioBeneficiario.classList.add('was-validated'); 
        return false; 
    }
}

function cadastrarBeneficiario(beneficiario) {
    fetch('http://localhost:3000/beneficiario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(beneficiario)
    })
        .then((resposta) => {
            return resposta.json();
        })
        .then((dados) => {
            if (dados.status) {
                formularioBeneficiario.reset();
                mostrarMensagem(dados.mensagem, true);
                buscarBeneficiario();
            }
            else {
                mostrarMensagem(dados.mensagem, false);
            }

        })
        .catch((erro) => {
            mostrarMensagem(erro.message, false);
        });
}

function buscarBeneficiario() {
    fetch('http://localhost:3000/beneficiario', { method: 'GET' })
        .then((resposta) => {
            return resposta.json();
        })
        .then((dados) => {
            if (Array.isArray(dados)) {
                exibirTabelaBeneficiario(dados);
            }
            else {
                mostrarMensagem(dados.mensagem, false);
            }
        })
        .catch((erro) => {
            mostrarMensagem(erro.message, false);
        });
}


function mostrarMensagem(mensagem, sucesso = false) {
    const divMensagem = document.getElementById('mensagem');
    if (sucesso) {
        divMensagem.innerHTML = `
        <div class="alert alert-success" role="alert">
        ${mensagem}
        </div>`;
    }
    else {
        divMensagem.innerHTML = `
        <div class="alert alert-danger" role="alert">
        ${mensagem}
        </div>`;
    }

    setTimeout(() => {
        divMensagem.innerHTML = ''
    }, 10000);
}

function exibirTabelaBeneficiario(listaBeneficiario) {
    const espacoTabela = document.getElementById('espacoTabela');
    espacoTabela.innerHTML = '';
    if (Array.isArray(listaBeneficiario) && listaBeneficiario.length > 0) {
        const tabela = document.createElement('table');
        tabela.className = 'table table-striped table-hover';
        const cabecalho = document.createElement('thead');
        cabecalho.innerHTML = `
        <tr>
            <th>#</th>
            <th>Nome</th>
            <th>CPF</th>
            <th>Contato</th>
            <th>Endereço</th>
            <th>Bairro</th>
            <th>Número</th>
            <th>Data de Nascimento</th>
            <th>Ações</th>
        </tr>
        `;
        tabela.appendChild(cabecalho);
        const corpo = document.createElement('tbody');
        for (let i = 0; i < listaBeneficiario.length; i++) {
            const beneficiario = listaBeneficiario[i];
            const linha = document.createElement('tr');
            linha.innerHTML = `
            <td>${beneficiario.codigo}</td>
            <td>${beneficiario.nome}</td>
            <td>${beneficiario.cpf}</td>
            <td>${beneficiario.contato}</td>
            <td>${beneficiario.endereco}</td>
            <td>${beneficiario.bairro}</td>
            <td>${beneficiario.numero}</td>
            <td>${beneficiario.datanascimento}</td>
            <td>
            <button type="button" onclick="prepararBeneficiario('${beneficiario.codigo}', '${beneficiario.nome}', '${beneficiario.cpf}', '${beneficiario.contato}', '${beneficiario.endereco}', '${beneficiario.bairro}', '${beneficiario.numero}', '${beneficiario.datanascimento}')">Editar</button>
            </td>`;
            corpo.appendChild(linha);
        }
        tabela.appendChild(corpo);
        espacoTabela.appendChild(tabela);
    } else {
        espacoTabela.innerHTML = '<p>Nenhum Beneficiario Encontrado</p>';
    }
}

function prepararBeneficiario(codigo, nome, cpf, contato, endereco, bairro, numero, datanascimento) {
    
    document.getElementById('codigo').value = codigo;
    document.getElementById('nome').value = nome;
    document.getElementById('cpf').value = cpf;
    document.getElementById('contato').value = contato;
    document.getElementById('endereco').value = endereco;
    document.getElementById('bairro').value = bairro;
    document.getElementById('numero').value = numero;
    document.getElementById('datanascimento').value = datanascimento;
}

function apagarBeneficiario() {
    const codigo = document.getElementById('codigo').value;
    if (confirm("Confirma a exclusão do Beneficiario?")) {
        fetch(`http://localhost:3000/beneficiario/${codigo}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        })
        .then((resposta) => {
            if (!resposta.ok) {
                return resposta.text().then(text => {
                    throw new Error(`Erro na requisição: ${resposta.status} ${resposta.statusText} ${text}`);
                });
            }
            return resposta.json();
        })
        .then((dados) => {
            if (dados && dados.mensagem) {
                mostrarMensagem(dados.mensagem, true);
            } else {
                mostrarMensagem("Ocorreu um erro ao processar a solicitação.", false);
            }
            buscarBeneficiario(); 
        })
        .catch((erro) => {
            mostrarMensagem(erro.message, false);
        });
    } else {
        prepararBeneficiario(); 
    }
}
