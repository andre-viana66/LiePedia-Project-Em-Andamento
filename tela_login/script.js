var FormularioLogin = document.getElementById("FormularioLogin");
const mensagemErro = document.getElementById("MensagemVaziaLogin"); // Obtém o elemento de mensagem de erro


function ValidarEspacosEmBrancoLogin(email, senha) {
    return (email.trim() === "" || senha.trim() === ""); // Verifica se algum dos campos está vazio
}

function ValidarEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expressão regular para validar o formato do email
    return emailRegex.test(email); // Retorna verdadeiro se o email estiver no formato correto
}

function TamanhoSenha(senha) {
    return senha.length >= 8; // Retorna verdadeiro se a senha tiver pelo menos 8 caracteres
}

function validarCaracteresEspeciaisSenha(senha) {
    const regex = /[!@#$%^&*(),.?":{}|<>]/; // Expressão regular para verificar caracteres especiais
    return regex.test(senha); // Retorna verdadeiro se a senha contiver caracteres especiais
}

function validarLetrasMaiusculas(senha) {
    const regex = /[A-Z]/; // Expressão regular para verificar letras maiúsculas
    return regex.test(senha); // Retorna verdadeiro se a senha contiver letras maiúsculas
}

function validarLetrasMinusculas(senha) {
    const regex = /[a-z]/; // Expressão regular para verificar letras minúsculas
    return regex.test(senha); // Retorna verdadeiro se a senha contiver letras minúsculas
}

function validarNumeros(senha) {
    const regex = /[0-9]/; // Expressão regular para verificar números
    return regex.test(senha); // Retorna verdadeiro se a senha contiver números
}


function limparMensagemErro() {
    mensagemErro.textContent = ""; // Limpa a mensagem de erro
}

FormularioLogin.addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o envio do formulário

    const email = document.getElementById("email").value; // Obtém o valor do campo de email
    const senha = document.getElementById("senha").value; // Obtém o valor do campo de senha

    if (ValidarEspacosEmBrancoLogin(email, senha)) { // Verifica se algum dos campos está vazio
        mensagemErro.textContent = "Por favor, preencha todos os campos."; // Exibe a mensagem de erro
        console.log("Por favor, preencha todos os campos.");
        return;
    }

    if (!ValidarEmail(email)) { // Verifica se o email está no formato correto
        mensagemErro.textContent = "O email não está no formato correto."; // Exibe a mensagem de erro
        console.log("O email não está no formato correto.");
        return;
    }

    if (!TamanhoSenha(senha)) { // Verifica se a senha tem pelo menos 8 caracteres
        mensagemErro.textContent = "A senha deve ter pelo menos 8 caracteres."; // Exibe a mensagem de erro
        console.log("A senha deve ter pelo menos 8 caracteres.");
        return;
    }

    if (!validarCaracteresEspeciaisSenha(senha)) { // Verifica se a senha contém caracteres especiais
        mensagemErro.textContent = "A senha deve conter pelo menos um caractere especial."; // Exibe a mensagem de erro
        console.log("A senha deve conter pelo menos um caractere especial.");
        return;
    } 

    if (!validarLetrasMaiusculas(senha)) { // Verifica se a senha contém letras maiúsculas
        mensagemErro.textContent = "A senha deve conter pelo menos uma letra maiúscula."; // Exibe a mensagem de erro
        console.log("A senha deve conter pelo menos uma letra maiúscula.");
        return;
    }

    if (!validarLetrasMinusculas(senha)) { // Verifica se a senha contém letras minúsculas
        mensagemErro.textContent = "A senha deve conter pelo menos uma letra minúscula."; // Exibe a mensagem de erro
        console.log("A senha deve conter pelo menos uma letra minúscula.");
        return;
    }

    if (!validarNumeros(senha)) { // Verifica se a senha contém números
        mensagemErro.textContent = "A senha deve conter pelo menos um número.";
        console.log("A senha deve conter pelo menos um número.");
        return;
    }

    console.log("Todos os campos estão preenchidos corretamente: ", email, senha); // Exibe uma mensagem de sucesso no console

    limparMensagemErro(); // Limpa a mensagem de erro se os campos estiverem preenchidos

    fetch("login.php", { // Faz uma requisição para o arquivo login.php
        method: "POST", // Define o método da requisição como POST
        headers: { // Define o cabeçalho da requisição como JSON
            "Content-Type": "application/json"
        },

        body: JSON.stringify({ // Converte os dados do formulário em JSON
            email,
            senha
        })
    })
    .then(function (response) { // Recebe a resposta da requisição
        return response.json(); // Converte a resposta em JSON
    })
    .then(function (data) { // Recebe os dados do servidor
        if (data.sucesso) { // Verifica se o login foi bem-sucedido
            console.log("Login bem-sucedido!"); // Exibe uma mensagem de sucesso no console
            window.location.href = "liepedia.html"; // Redireciona para a tela inicial
        } else {
            mensagemErro.textContent = data.mensagem; // Exibe a mensagem de erro recebida do servidor
            console.log(data.mensagem); // Exibe a mensagem de erro no console
        }
    })
    .catch(function(error) { // Captura qualquer erro que ocorra durante a requisição
        console.error("Erro na requisição:", error); // Exibe o erro no console
        mensagemErro.textContent = "Erro na requisição"; // Exibe uma mensagem de erro genérica
    });
});
