const API_URL = 'http://localhost:8080/api/clientes';

// Função executada ao abrir a tela
document.addEventListener("DOMContentLoaded", () => {
    carregarClientes();
});

// 1. GET: Buscar dados da API
async function carregarClientes() {
    const resposta = await fetch(API_URL); // Vai no Backend
    const clientes = await resposta.json(); // Converte o JSON recebido

    const tabela = document.getElementById('tabela-corpo');
    tabela.innerHTML = ''; // Limpa a tabela

    // Para cada cliente, cria uma linha na tabela
    clientes.forEach(cliente => {
        const linha = `
            <tr>
                <td>${cliente.id}</td>
                <td>${cliente.nome}</td>
                <td>${cliente.email}</td>
                
                <td>
                    <a th:href="@{/clientes/excluir/{id}(id=${cliente.id})}" 
                    class="btn btn-danger btn-sm"
                    onclick="removerCliente(${cliente.id}); return false;">
                    Excluir
                    </a>
                </td>

            </tr>
        `;
        tabela.innerHTML += linha;
    });
}

// 2. POST: Enviar dados para a API
async function salvarCliente() {
    const nomeInput = document.getElementById('nome').value;
    const emailInput = document.getElementById('email').value;

   if (nomeInput.trim() === '' || emailInput.trim() === '') {
        alert('Preencha todos os campos!');
        return;
    }

    const dados = {
        nome: nomeInput,
        email: emailInput
    };

    const resposta = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados) // Transforma o objeto JS em texto JSON
    });

    if (resposta.ok) {
        alert('Cliente salvo!');
        carregarClientes(); // Recarrega a tabela
        // Limpar campos
        document.getElementById('nome').value = '';
        document.getElementById('email').value = '';
    } else {
        alert('Erro ao salvar');
    }
}

async function localizarCliente() {
    const consulta = document.getElementById('consultarCliente').value.trim();    
    if (consulta === '') {
        carregarClientes();
        return
    }        
    
    // Você monta a URL com o parâmetro de busca, dependendo se é ID ou nome
    const urlComFiltro = `${API_URL}/${consulta}`; 

    const resposta = await fetch(urlComFiltro, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!resposta.ok) {
        alert('Erro ao consultar cliente!');
        return;
    }

    // Opcional: Verifica se a resposta está vazia antes de converter
    const texto = await resposta.text(); 
    if (!texto) {
        alert("Nenhum cliente retornado.");
        return;
    }

    const tabela = document.getElementById('tabela-corpo');
    tabela.innerHTML = ''; // Limpa a tabela

    const cliente = JSON.parse(texto); // Converte o JSON recebido

    // Para cada cliente, cria uma linha na tabela
    const linha = `
        <tr>
            <td>${cliente.id}</td>
            <td>${cliente.nome}</td>
            <td>${cliente.email}</td>
            
            <td>
                <a th:href="@{/clientes/excluir/{id}(id=${cliente.id})}" 
                class="btn btn-danger btn-sm"
                onclick="removerCliente(${cliente.id}); return false;">
                Excluir
                </a>
            </td>

        </tr>
    `;
    tabela.innerHTML += linha;
}

// 3. DELETE: Enviar dados para a API
async function removerCliente(id) {
    const resposta = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });

    if (resposta.ok) {
        alert('Cliente removido!');
        carregarClientes(); // Recarrega a tabela
    } else {
        alert('Erro ao remover cliente');
    }
}

async function desistir() {
    if (window.history.length > 1) {
        // Se tem histórico, volta
        window.history.back();
    } else {
        // Se não tem (ex: abriu em nova aba), vai para a Home
        window.location.href = '/'; // Ou '/home'
    }
}
