// Função executada quando a janela é carregada
window.onload = function () {
    // Selecionar elementos do HTML
    const tipoSalgadas = document.querySelector("#receitas-salgadas");
    const tipoDoces = document.querySelector("#receitas-doces");
    const minhasReceitasContainer = document.getElementById('minhas-receitas-container');

    // Criar card de uma receita para ser exibido nas receitas curtidas
    function criarCardReceita(receita) {
        const card = document.createElement("div");
        card.classList.add("card");

        const link = document.createElement("a");
        link.addEventListener("click", function () {
            ViewexibirReceita(receita.link);
        });
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

        link.append(img, titulo, descricao);
        card.appendChild(link);

        return card;
    }
    // Função para curtir uma receita
    function curtirReceita(nomeReceita) {
        const receitasCurtidas = JSON.parse(localStorage.getItem('MinhasReceitas')) || [];
        
        if (!receitasCurtidas.includes(nomeReceita)) {
            receitasCurtidas.push(nomeReceita);
            localStorage.setItem('MinhasReceitas', JSON.stringify(receitasCurtidas));
            alert('Receita curtida!');
            exibirMinhasReceitas();
        } else {
            alert('Você já curtiu esta receita!');
        }
    }
    // Verificar se o usuário está logado e ajustar o header
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
    // Exibir as receitas curtidas ao carregar a página
    function exibirMinhasReceitas() {
        minhasReceitasContainer.innerHTML = ""; // Limpa o conteúdo atual
    
        const receitasCurtidas = JSON.parse(localStorage.getItem('MinhasReceitas')) || [];
    
        receitasCurtidas.forEach(async nomeReceita => {
            const card = await criarCardMinhaReceita(nomeReceita);
            if (card) {
                minhasReceitasContainer.appendChild(card);
            }
        });
    }
    // Criar um card para uma receita curtida com base no nome
    async function criarCardMinhaReceita(nomeReceita) {
        const receitaSalgada = await obterDetalhesReceita(nomeReceita, tipoSalgadas);
        const receitaDoce = await obterDetalhesReceita(nomeReceita, tipoDoces);
    
        if (receitaSalgada) {
            return criarCardReceita(receitaSalgada);
        } else if (receitaDoce) {
            return criarCardReceita(receitaDoce);
        }
        return null;
    }

    // Função auxiliar para obter os detalhes da receita com base no nome
    async function obterDetalhesReceita(nomeReceita, tipo) {
        const localURL = tipo === tipoSalgadas ? 'receitas.json' : 'receitasdoces.json';
        
        try {
            const response = await fetch(localURL);
            const receitas = await response.json();
            
            // Encontre a receita com base no nome
            const receitaEncontrada = receitas.find(receita => receita.receita === nomeReceita);
            
            // Retorne a receita encontrada ou null se não encontrada
            return receitaEncontrada || null;
        } catch (error) {
            console.error('Erro ao carregar receitas:', error);
            return null;
        }
    }   
    exibirMinhasReceitas(); // Exibe as receitas curtidas ao carregar a página
}
