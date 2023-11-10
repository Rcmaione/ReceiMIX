onload = function () {
    function carregarReceitas() {
        fetch('receitas.json')
            .then(response => response.json())
            .then(receitas => {
                const container = document.querySelector("#receitas-totais");

                receitas.forEach(receita => {
                    const card = document.createElement("div");
                    card.classList.add("card");

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

                    const link = document.createElement("a");
                    link.href = receita.link;

                    card.appendChild(img);
                    card.appendChild(link);
                    card.appendChild(titulo);
                    card.appendChild(descricao);
                    card.appendChild(relogio)
                    card.appendChild(tempo);
                    card.appendChild(serve);
                    card.appendChild(pessoas);

                    link.appendChild(img);
                    link.appendChild(titulo);
                    link.appendChild(descricao);
                    link.appendChild(relogio);
                    link.appendChild(tempo);
                    link.appendChild(serve);
                    link.appendChild(pessoas);

                    container.appendChild(card);
                });
            })
            .catch(error => console.error('Erro ao carregar receitas:', error));
    }

    carregarReceitas();

    let count = 1;
    document.getElementById("radio1").checked = true;

    setInterval(function () {
        nextImage();
    }, 4000);

    function nextImage() {
        count++;
        if (count > 4) {
            count = 1;
        }
        document.getElementById("radio" + count).checked = true;
    }

    const content = document.querySelector(".cont");
    const inputSearch = document.getElementById("search");

    let items = [];

    function handleSearch(event) {
        const slide = document.getElementsByClassName("slider")[0].innerHTML = "";
        if (event.type === 'input' || (event.type === 'click' && event.key === 'Enter')) {
            content.innerHTML = "";

            items
                .filter((item) =>
                    item.receita.toLowerCase().includes(inputSearch.value.toLowerCase())
                )
                .forEach((item) => addHTML(item));
        }
    }

    inputSearch.addEventListener('input', handleSearch);


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

        div.appendChild(img);
        div.appendChild(link);
        div.appendChild(titulo);
        div.appendChild(descricao);
        div.appendChild(relogio);
        div.appendChild(tempo);
        div.appendChild(serve);
        div.appendChild(pessoas);
        link.appendChild(img);
        link.appendChild(titulo);
        link.appendChild(descricao);
        link.appendChild(relogio);
        link.appendChild(tempo);
        link.appendChild(serve);
        link.appendChild(pessoas);
        content.appendChild(div);

    }

    fetch('receitas.json')
    .then(response => response.json())
    .then(receitas => {
        receitas.forEach(receita => {
            items.push(receita);
        });
    })
    .catch(error => console.error('Erro ao carregar receitas para pesquisa:', error));



}
