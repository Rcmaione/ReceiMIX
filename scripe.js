window.onload = function () {
    const tipoSalgadas = document.querySelector("#receitas-salgadas");
    const tipoDoces = document.querySelector("#receitas-doces");

    function carregarReceitas(tipo) {
        const localURL = tipo === tipoSalgadas ? 'receitas.json' : 'receitasdoces.json';

        fetch(localURL)
            .then(response => response.json())
            .then(receitas => criarCardsReceitas(receitas, tipo))
            .catch(error => {
                console.error('Erro ao carregar receitas:', error);
            });
    }

    function criarCardsReceitas(receitas, container) {
        receitas.forEach(receita => {
            const card = criarCardReceita(receita);
            container.appendChild(card);
        });
    }

    function criarCardReceita(receita) {
        const card = document.createElement("div");
        card.classList.add("card");

        const link = document.createElement("a");
        link.href = receita.link;

        const img = document.createElement("img");
        img.classList.add("capa");
        img.src = receita.imagem;
        img.alt = receita.receita;

        const titulo = document.createElement("p");
        titulo.classList.add("nome-receita");
        titulo.textContent = receita.receita;

        const descricao = document.createElement("p");
        descricao.classList.add("desc-receita");
        descricao.textContent = receita.descricao;

        const relogio = document.createElement("img");
        relogio.classList.add("relogio");
        relogio.src = receita.relogio;

        const tempo = document.createElement("label");
        tempo.textContent = receita.tempo;

        const serve = document.createElement("img");
        serve.classList.add("relogio");
        serve.src = receita.serve;

        const pessoas = document.createElement("label");
        pessoas.textContent = receita.pessoas;

        link.append(img, titulo, descricao, relogio, tempo, serve, pessoas);
        card.appendChild(link);

        return card;
    }

    carregarReceitas(tipoSalgadas);
    carregarReceitas(tipoDoces);

    let count = 1;
    document.getElementById("radio1").checked = true;

    const intervalId = setInterval(nextImage, 4000);

    function nextImage() {
        count++;
        if (count > 4) {
            count = 1;
        }
        document.getElementById("radio" + count).checked = true;
    }

    const inputSearch = document.getElementById("search");
    const content = document.querySelector(".cont1");
    const content2 = document.querySelector(".cont2");
    const h1 = document.querySelector(".tipo-rec");
    const h1_1 = document.querySelector(".tipo-rec2");
    const items = [];
    function handleSearch(event) {
        const slide = document.querySelector(".slider");
    
        if (event.type === 'input') {
            content.innerHTML = "";
            content2.innerHTML = "";
            h1.innerHTML = "";
            h1_1.innerHTML = "";
            slide.innerHTML = "";
    
            if (!inputSearch || inputSearch.value.trim() === '') {
                window.location.reload();
            } else {
                items
                    .filter((item) =>
                        item.receita.toLowerCase().includes(inputSearch.value.toLowerCase())
                    )
                    .forEach((item) => addHTML(item));
            }
        }
    }

    function addHTML(item) {
        const div = document.createElement("div");
        div.classList.add("card");

        const img = document.createElement("img");
        img.classList.add("capa");
        img.src = item.imagem;
        img.alt = item.receita;

        const titulo = document.createElement("p");
        titulo.classList.add("nome-receita");
        titulo.textContent = item.receita;

        const descricao = document.createElement("p");
        descricao.classList.add("desc-receita");
        descricao.textContent = item.descricao;

        const relogio = document.createElement("img");
        relogio.classList.add("relogio");
        relogio.src = item.relogio;

        const tempo = document.createElement("label");
        tempo.textContent = item.tempo;

        const serve = document.createElement("img");
        serve.classList.add("relogio");
        serve.src = item.serve;

        const pessoas = document.createElement("label");
        pessoas.textContent = item.pessoas;

        const link = document.createElement("a");
        link.href = item.link;

        link.append(img, titulo, descricao, relogio, tempo, serve, pessoas);
        div.appendChild(link);
        content.appendChild(div);
    }

    function buscarReceitas(tipo) {
        const localURL = tipo === tipoSalgadas ? 'receitas.json' : 'receitasdoces.json';
        fetch(localURL)
            .then(response => response.json())
            .then(receitas => {
                receitas.forEach(receita => {
                    items.push(receita);
                    
                });
            })
            .catch(error => console.error('Erro ao carregar receitas para pesquisa:', error));
    }

    buscarReceitas(tipoSalgadas);
    buscarReceitas(tipoDoces);
    

    inputSearch.addEventListener('input', handleSearch);
    
    window.onunload = function () {
        clearInterval(intervalId);
    }
};
