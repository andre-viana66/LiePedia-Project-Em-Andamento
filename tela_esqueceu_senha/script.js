var formulario = document.getElementById("FormEsqueceuSenha"); // Obtém o formulário pelo ID
const mensagemErro = document.getElementById("MensagemErro"); // Obtém o elemento de mensagem de erro pelo ID
const mensagemSucesso = document.getElementById("MensagemSucesso"); // Obtém o elemento de mensagem de sucesso pelo ID


function validarEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expressão regular para validar o formato do email
    return emailRegex.test(email); // Retorna verdadeiro se o email estiver no formato correto
}

function limparErro(){
    mensagemErro.textContent = ""; // Limpa a mensagem de erro
}

formulario.addEventListener("submit", function(event) { //Cria um evento de escuta para o envio do formulário
    event.preventDefault(); // Impede o envio do formulário
    const email = document.getElementById("email").value; // Obtém o valor do campo de email

    if (email.trim() === "") { // Verifica se o campo de email está vazio
        mensagemErro.textContent = "Por favor, preencha o campo de e-mail."; // Exibe a mensagem de erro
        return; // Interrompe a execução do código
    }

    if (!validarEmail(email)) { // Verifica se o email está no formato correto
        mensagemErro.textContent = "O email não está no formato correto."; // Exibe a mensagem de erro
        return; // Interrompe a execução do código
    }

    

    fetch("esqueceu_senha.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            email: email 
        })
    })

    .then(function (response) { // Recebe a resposta da requisição
        return response.json(); // Converte a resposta em JSON
    })

    .then(function (data) { // Recebe os dados do servidor
        if (data.sucesso) { // Verifica se o login foi bem-sucedido
            console.log("Email enviado com sucesso!"); // Exibe uma mensagem de sucesso no console
            mensagemSucesso.textContent = data.mensagem; // Exibe a mensagem de sucesso recebida do servidor
        } else {
            mensagemSucesso.textContent = data.mensagem; // Exibe a mensagem de erro recebida do servidor
            console.log(data.mensagem); // Exibe a mensagem de erro no console
        }
    })
    .catch(function(error) { // Captura qualquer erro que ocorra durante a requisição
        console.error("Erro na requisição:", error); // Exibe o erro no console
        mensagemSucesso.textContent = "Erro na requisição"; // Exibe uma mensagem de erro genérica
    });

    limparErro();
});

