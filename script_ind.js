document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector("#conteudo");

    function carregarReceitas() {
        fetch('receitas_individuais.json')
            .then(response => response.json())
            .then(receitas => exibirReceitas(receitas))
            .catch(error => console.error('Erro ao carregar receitas:', error));
    }

    function exibirReceitas(receitas) {
        receitas.forEach(receita => {
            const card = criarCardReceita(receita);
            container.appendChild(card);
        });
    }

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

        const botaoAdicionar = document.createElement("a");
        botaoAdicionar.href = "#";
        botaoAdicionar.classList.add("botao");
        botaoAdicionar.textContent = "Adicionar às minhas receitas";

        card.appendChild(tituloModoPreparo);
        card.appendChild(listaModoPreparo);
        card.appendChild(botaoAdicionar);

        return card;
    }

    carregarReceitas();
});
