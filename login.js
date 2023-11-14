const container = document.getElementById('container');
const registerBtn = document.getElementById('registrar');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

function logar() {
    var login = document.getElementById('usuario').value;
    var senhaElement = document.getElementById('senha');
    var senha = senhaElement.value;

    let cadastros = JSON.parse(localStorage.getItem('cadastros'));

    let usuario = cadastros.find(cadastro => cadastro.email === login && cadastro.senha === senha);

    if (usuario) {
        location.href = "index.html";
    } else {
        alert("Senha inválida");
        senhaElement.style.backgroundColor = 'red';
    }
}

function cadastrar() {
    var email = document.getElementById('cad-user').value;
    var senha = document.getElementById('cad-senha').value;

    let cadastros = [];

    if(localStorage.getItem('cadastros')){
        cadastros = JSON.parse(localStorage.getItem('cadastros'));
    }

    cadastros.push({
        email: email,
        senha: senha
    });

    localStorage.setItem('cadastros', JSON.stringify(cadastros));

    alert('Cadastro realizado com sucesso!');

    document.getElementById('email').value = '';
    document.getElementById('telefone').value = '';
    }

