const API_URL = 'http://localhost:8080/api/produtos';

// Função executada ao abrir a tela
document.addEventListener("DOMContentLoaded", () => {
    carregarProdutos();
});

// 1. GET: Buscar dados da API
async function carregarProdutos() {
    const resposta = await fetch(API_URL); // Vai no Backend
    const produtos = await resposta.json(); // Converte o JSON recebido

    const tabela = document.getElementById('tabela-corpo');
    tabela.innerHTML = ''; // Limpa a tabela

    // Para cada produto, cria uma linha na tabela
    produtos.forEach(produto => {
        const linha = `
            <tr>
                <td>${produto.id}</td>
                <td>${produto.descricao}</td>
                <td>${produto.quantidadeEstoque}</td>
                <td>${produto.valor}</td>
                
                <td>
                    <a th:href="@{/produtos/excluir/{id}(id=${produto.id})}" 
                    class="btn btn-danger btn-sm"
                    onclick="removerProduto(${produto.id}); return false;">
                    Excluir
                    </a>
                </td>

            </tr>
        `;
        tabela.innerHTML += linha;
    });
}

// 2. POST: Enviar dados para a API
async function salvarProduto() {
    const descricaoInput = document.getElementById('descricao').value;
    const valorInput = document.getElementById('valor').value;
    const quantidadeEstoqueInput = document.getElementById('quantidadeEstoque').value;

    if (descricaoInput.trim() === '' || valorInput.trim() === '' || quantidadeEstoqueInput.trim() === '') {
        alert('Preencha todos os campos!');
        return;
    }

    const dados = {
        descricao: descricaoInput,
        valor: valorInput,
        quantidadeEstoque: Number(quantidadeEstoqueInput)
    };

    const resposta = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados) // Transforma o objeto JS em texto JSON
    });

    if (resposta.ok) {
        alert('Produto salvo!');
        carregarProdutos(); // Recarrega a tabela
        // Limpar campos
        document.getElementById('descricao').value = '';
        document.getElementById('valor').value = '';
        document.getElementById('quantidadeEstoque').value = '';
    } else {
        alert('Erro ao salvar');
    }
}

async function localizarProduto() {
    const consulta = document.getElementById('consultarProduto').value.trim();
    if (consulta === '') {
        carregarProdutos();
        return;
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
        alert('Erro ao consultar produto!');
        return;
    }

    // Opcional: Verifica se a resposta está vazia antes de converter
    const texto = await resposta.text();
    if (!texto) {
        alert("Nenhum produto retornado.");
        return;
    }

    const tabela = document.getElementById('tabela-corpo');
    tabela.innerHTML = ''; // Limpa a tabela

    const produto = JSON.parse(texto); // Converte o JSON recebido

    // Para cada produto, cria uma linha na tabela
    const linha = `
        <tr>
            <td>${produto.id}</td>
            <td>${produto.descricao}</td>
            <td>${produto.quantidadeEstoque}</td>
            <td>${produto.valor}</td>
            
            <td>
                <a th:href="@{/produtos/excluir/{id}(id=${produto.id})}" 
                class="btn btn-danger btn-sm"
                onclick="removerProduto(${produto.id}); return false;">
                Excluir
                </a>
            </td>

        </tr>
    `;
    tabela.innerHTML += linha;
}

// 3. DELETE: Enviar dados para a API
async function removerProduto(id) {
    const resposta = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });

    if (resposta.ok) {
        alert('Produto removido!');
        carregarProdutos(); // Recarrega a tabela
    } else {
        alert('Erro ao remover produto');
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
