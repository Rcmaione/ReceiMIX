// Aguarda o DOM ser completamente carregado antes de executar o código
document.addEventListener('DOMContentLoaded', function () {
    // Seleciona o elemento container no HTML
    const container = document.querySelector("#conteudo");

    // Função para carregar as receitas a partir de um arquivo JSON
    function carregarReceitas() {
        fetch('receitas_individuais.json')
            .then(response => response.json())
            .then(receitas => exibirReceitas(receitas))
            .catch(error => console.error('Erro ao carregar receitas:', error));
    }

    // Função para exibir as receitas na página
    function exibirReceitas(receitas) {
        receitas.forEach(receita => {
            const card = criarCardReceita(receita);
            container.appendChild(card);
        });
    }

    // Função para criar um card de receita com título, ingredientes e modo de preparo
    function criarCardReceita(receita) {
        const card = document.createElement("div");
        card.classList.add("conteudo");

        const tituloReceita = document.createElement("h1");
        tituloReceita.classList.add("titulo-receita");
        tituloReceita.textContent = receita.titulo;

        const cardIngredientes = criarCardIngredientes(receita.ingredientes);
        const cardModoPreparo = criarCardModoPreparo(receita.modoPreparo);

        card.appendChild(tituloReceita);
        card.appendChild(cardIngredientes);
        card.appendChild(cardModoPreparo);

        return card;
    }

    // Função para criar um card de ingredientes
    function criarCardIngredientes(ingredientes) {
        const card = document.createElement("div");
        card.classList.add("carde");

        const tituloIngredientes = document.createElement("h1");
        tituloIngredientes.textContent = "INGREDIENTES";

        const listaIngredientes = document.createElement("ul");
        ingredientes.forEach(ingrediente => {
            const item = document.createElement("li");
            item.textContent = ingrediente;
            listaIngredientes.appendChild(item);
        });

        card.appendChild(tituloIngredientes);
        card.appendChild(listaIngredientes);

        return card;
    }

    // Função para criar um card de modo de preparo
    function criarCardModoPreparo(modoPreparo) {
        const card = document.createElement("div");
        card.classList.add("carde");

        const tituloModoPreparo = document.createElement("h1");
        tituloModoPreparo.textContent = "MODO DE PREPARO";

        const listaModoPreparo = document.createElement("ol");
        modoPreparo.forEach(passo => {
            const item = document.createElement("li");
            item.textContent = passo;
            listaModoPreparo.appendChild(item);
        });

        // Botão para adicionar a receita às minhas receitas
        const botaoAdicionar = document.createElement("a");
        botaoAdicionar.href = "#";
        botaoAdicionar.classList.add("botao");
        botaoAdicionar.textContent = "Adicionar às minhas receitas";

        card.appendChild(tituloModoPreparo);
        card.appendChild(listaModoPreparo);
        card.appendChild(botaoAdicionar);

        return card;
    }

    // Chama a função para carregar as receitas ao carregar a página
    carregarReceitas();
});
