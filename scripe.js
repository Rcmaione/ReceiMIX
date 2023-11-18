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
        
        const link = document.createElement("button");
        link.id = receita.link;
        link.setAttribute("onclick", "ViewexibirReceita(\""+receita.link+"\")");
    
        const img = document.createElement("img");
        img.classList.add("capa-mr");
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
    
        const botao = document.createElement("butto");
        botao.id = "CREATEBOTAO"; 
        botao.textContent = "Curtir"; 
    
        botao.addEventListener("click", function () {
            curtirReceita(receita.receita);
        });
    
        link.append(img, titulo, descricao, relogio, tempo, serve, pessoas, botao);

    
        return link;
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
        link.addEventListener("click", function () {
            ViewexibirReceita(item.link);
        });
    
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

    // Verificar se o cookie de autenticação existe
    const logado = document.cookie.includes("userLoggedIn=true");

    if (logado) {
        const minhasReceitasLink = document.createElement('a');
        minhasReceitasLink.href = 'MinhasReceitas.html';

        const minhasReceitasText = document.createElement('p');
        minhasReceitasText.id = 'botaominhasreceitas';
        minhasReceitasText.textContent = 'Minhas Receitas';

        minhasReceitasLink.appendChild(minhasReceitasText);

        // Criar o elemento de "Sair"
        const sair = document.createElement('p');
        sair.id = 'botaosair';
        sair.textContent = 'Sair';

        // Adicionar um evento de clique para remover o cookie e redirecionar para a página de login
        sair.addEventListener('click', function () {
            document.cookie = "userLoggedIn=false; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
            window.location.href = 'index.html'; // Redirecionar para a página de login
        });

        // Adicionar os elementos ao header
        const navheader = document.querySelector('#minhasreceitas');
        navheader.appendChild(minhasReceitasLink);
        navheader.appendChild(sair);

        // Remover elemento com ID "remover"
        const elementoARemover = document.getElementById("remover");
        if (elementoARemover) {
            elementoARemover.remove();
        }
    }
    const MINHAS_RECEITAS_KEY = 'MinhasReceitas';

    function curtirReceita(nomeReceita) {
        const receitasCurtidas = JSON.parse(localStorage.getItem(MINHAS_RECEITAS_KEY)) || [];

        if (!receitasCurtidas.includes(nomeReceita)) {
            receitasCurtidas.push(nomeReceita);
            localStorage.setItem(MINHAS_RECEITAS_KEY, JSON.stringify(receitasCurtidas));
            alert('Receita curtida!');

           
        } else {
            alert('Você já curtiu esta receita!');
        }
    }

}
