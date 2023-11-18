class ReceitaModel {
    constructor() {
        this.nome = "";
        this.titulo = "";
        this.imagem = "";
        this.ingredientes = [];
        this.modoPreparo = [];
    }
}

async function ViewexibirReceita(nome) {
    const corpo = document.getElementById("receitasView");
    corpo.innerHTML = "";
    let div = document.createElement("div");
    div.setAttribute("id", "data-receita");
    corpo.appendChild(div);
    
    await buscaReceita(nome);
    viewaddcompartilhar(corpo)
    viewaddComplementos(corpo);
}

function buscaReceita(nome) {
    fetch('receitas_individuais.json')
        .then(response => response.json())
        .then(receitas => pegaReceita(receitas, nome));
}

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

function viewaddcompartilhar(corpo) {
    const compartilhar = `<div class="compartilhar">
    <p id="compartilhe">Compartilhe essa receita:</p>
    <a href="https://www.facebook.com/sharer/sharer.php?u=https://rcmaione.github.io/animar/">
        <img width="25" height="25" src="https://ayltoninacio.com.br/img/s/18w50.jpg" alt="Compartilhe no Facebook">
    </a>
    <a href="https://api.whatsapp.com/send?text=https://rcmaione.github.io/animar/">
        <img width="25" height="25" src="https://ayltoninacio.com.br/img/s/20w50.jpg" alt="Compartilhe no WhatsApp">
    </a>
    <a href="javascript:void(0)" onclick="share()">
        <img width="25" height="25" src="https://ayltoninacio.com.br/img/s/21w50.jpg" alt="Compartilhe">
    </a>
</div>`;
corpo.innerHTML += compartilhar;
}
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
            <p>Transformar xicaras em mililitros</p>
            <p>-------------------------------</p>
            <label id="labelcalc" for="xicaras">Xícaras:</label>
            <input type="number" id="xicaras" placeholder="Insira a quantidade em xícaras">
            <button id="botaocalc" onclick="converterXicarasEmMililitros()">Converter</button>
            <p id="resultado2"></p>
        </ul>
        <ul id="ulcalc">
            <p>-------------------------------</p>
            <p>Transformar xicaras em gramas</p>
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
