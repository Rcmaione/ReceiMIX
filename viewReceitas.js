// Classe para representar o modelo de uma receita
class ReceitaModel {
    constructor() {
        this.nome = "";
        this.titulo = "";
        this.imagem = "";
        this.ingredientes = [];
        this.modoPreparo = [];
    }
}

// Função assíncrona para exibir uma receita na visualização
async function ViewexibirReceita(nome) {
    const corpo = document.getElementById("receitasView");
    const pesquisa = document.getElementById("inputsearch");

    if (!corpo) {
        console.error('Elemento com ID "receitasView" não encontrado.');
        return;
    }
    corpo.innerHTML = "";
    if (pesquisa) {
        pesquisa.innerHTML = "";
    }
    let div = document.createElement("div");
    div.setAttribute("id", "data-receita");
    corpo.appendChild(div);

    await buscaReceita(nome);
    viewaddComplementos(corpo);
}

// Função para buscar uma receita a partir de um arquivo JSON
function buscaReceita(nome) {
    fetch('receitas_individuais.json')
        .then(response => response.json())
        .then(receitas => pegaReceita(receitas, nome));
}

// Função para obter os detalhes de uma receita a partir da lista de receitas
function pegaReceita(receitasJ, nome) {
    let receita = new ReceitaModel();
    receitasJ.some(receitaL => {
        if (receitaL.nome === nome) {
            receita.nome = receitaL.nome;
            receita.titulo = receitaL.titulo;
            receita.imagem = receitaL.imagem;
            receita.ingredientes = receitaL.ingredientes;
            receita.modoPreparo = receitaL.modoPreparo;
            return true;
        }
        return false;
    });
    viewmontarReceita(receita);
}

// Função para montar e exibir os detalhes de uma receita
function viewmontarReceita(receita) {
    const corpo = document.getElementById("data-receita");

    // Adicionar imagem
    let divImagem = document.createElement("div");
    divImagem.setAttribute("id", "data-receita-imagem");
    let img = document.createElement("img");
    img.src = receita.imagem;
    img.alt = receita.titulo;
    divImagem.appendChild(img);
    corpo.appendChild(divImagem);

    // Adicionar título
    let h1Titulo = document.createElement("h1");
    h1Titulo.textContent = receita.titulo;
    corpo.appendChild(h1Titulo);

    // Adicionar ingredientes
    let divIngredientes = document.createElement("div");
    let tituloIngredientes = document.createElement("h1");
    tituloIngredientes.textContent = "INGREDIENTES";
    divIngredientes.appendChild(tituloIngredientes);

    divIngredientes.setAttribute("id", "data-receita-ingredientes");
    let ulIngredientes = document.createElement("ul");
    for (const ing of receita.ingredientes) {
        let li = document.createElement("li");
        li.textContent = ing;
        ulIngredientes.appendChild(li);
    }
    divIngredientes.appendChild(ulIngredientes);
    corpo.appendChild(divIngredientes);

    // Adicionar modo de preparo
    let divModoPreparo = document.createElement("div");
    divModoPreparo.setAttribute("id", "data-receita-modoPreparo");
    let h2ModoPreparo = document.createElement("h1");
    h2ModoPreparo.textContent = "MODO DE PREPARO";
    divModoPreparo.appendChild(h2ModoPreparo);

    let olModoPreparo = document.createElement("ol");
    for (const passo of receita.modoPreparo) {
        let li = document.createElement("li");
        li.textContent = passo;
        olModoPreparo.appendChild(li);
    }
    divModoPreparo.appendChild(olModoPreparo);
    corpo.appendChild(divModoPreparo);
}

// Função para compartilhar a aplicação, se o navegador suportar a API "navigator.share"
function share() {
    if (navigator.share !== undefined) {
        navigator.share({
            title: 'ReceiMIX',
            text: 'A sua melhor receita',
            url: 'https://rcmaione.github.io/ReceiMIX/',
        })
        .then(() => console.log('Compartilhamento bem-sucedido'))
        .catch((error) => console.log('Erro ao compartilhar', error));
    }
}

// Função para converter colheres de sopa em gramas
function converterGramasEmColheres() {
    const colheres = parseFloat(document.getElementById("colheres").value);
    const resultadoElement = document.getElementById("resultado");
    const gramas = colheres * 18;
    resultadoElement.innerHTML = `${colheres} colher(es) de sopa é aproximadamente ${gramas.toFixed(1)} gramas.`;
}

// Função para converter xícaras em mililitros
function converterXicarasEmMililitros() {
    const xicaras = parseFloat(document.getElementById("xicaras").value);
    const resultadoElement = document.getElementById("resultado2");
    const mililitros = xicaras * 240;
    resultadoElement.innerHTML = `${xicaras} xícara(s) é aproximadamente ${mililitros.toFixed(1)} ml.`;
}

// Função para converter xícaras em gramas
function converterXicarasEmGramas() {
    const xicaras = parseFloat(document.getElementById("xicaras2").value);
    const resultadoElement = document.getElementById("resultado3");
    const gramas = xicaras * 240;
    resultadoElement.innerHTML = `${xicaras} xícara(s) é aproximadamente ${gramas.toFixed(1)} gramas.`;
}

// Função para adicionar complementos à visualização
function viewaddComplementos(corpo) {

    const calculadora = `<aside class="fixed-element">
        <div class="calculadora">
    <h3>Calculadora de medidas</h3>
    <ol>
        <ul id="ulcalc"><p>-------------------------------</p>
            <p>Transformar colheres de sopa em gramas</p>
            <p>-------------------------------</p>
            <label id="labelcalc" for="colheres">Colheres:</label>
            <input type="number" id="colheres" placeholder="Insira a quantidade de colheres">
            <button id="botaocalc" onclick="converterGramasEmColheres()">Converter</button>
            <p id="resultado"></p>
        </ul>
        <ul id="ulcalc">
            <p>-------------------------------</p>
            <p>Transformar xícaras em mililitros</p>
            <p>-------------------------------</p>
            <label id="labelcalc" for="xicaras">Xícaras:</label>
            <input type="number" id="xicaras" placeholder="Insira a quantidade em xícaras">
            <button id="botaocalc" onclick="converterXicarasEmMililitros()">Converter</button>
            <p id="resultado2"></p>
        </ul>
        <ul id="ulcalc">
            <p>-------------------------------</p>
            <p>Transformar xícaras em gramas</p>
            <p>-------------------------------</p>
            <label id="labelcalc" for="xicaras2">Xícaras:</label>
            <input type="number" id="xicaras2" placeholder="Insira a quantidade em xícaras">
            <button id="botaocalc" onclick="converterXicarasEmGramas()">Converter</button>
            <p id="resultado3"></p>
        </ul>
    </ol>
    </div>
<aside>`;

    corpo.innerHTML += calculadora;

}
