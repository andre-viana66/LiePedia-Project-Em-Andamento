const formulario = document.getElementById("FormularioTrocaSenha"); // Obtém o formulário pelo ID
const mensagemErro = document.getElementById("MensagemErro"); // Obtém o elemento de mensagem de erro pelo ID
const mensagemSucesso = document.getElementById("MensagemSucesso"); // Obtém o elemento de mensagem de sucesso pelo ID

formulario.addEventListener("submit", function(event) {
    event.preventDefault();
    const senha = document.getElementById("senha").value; // Obtém o valor do campo de senha
    const confirmarSenha = document.getElementById("confirmaSenha").value; // Obtém o valor do campo de confirmação de senha


    if (senha.trim() === "" || confirmarSenha.trim() === ""){
        mensagemErro.textContent = "Por favor, preencha todos os campos."; // Exibe a mensagem de erro
        console.log("Por favor, preencha todos os campos."); // Exibe a mensagem de erro no console
        return; // Interrompe a execução do código
    }

    if (senha !== confirmarSenha) {
        mensagemErro.textContent = "As senhas não coincidem."; // Exibe a mensagem de erro
        console.log("As senhas não coincidem.");
        return; // Interrompe a execução do código
    }

    if (senha.length <8) {
        mensagemErro.textContent = "A senha deve ter pelo menos 8 caracteres."; // Exibe a mensagem de erro
        console.log("A senha deve ter pelo menos 8 caracteres.");
        return; // Interrompe a execução do código
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(senha)) {
        mensagemErro.textContent = "A senha deve conter pelo menos um caractere especial.";
        console.log("A senha deve conter pelo menos um caractere especial.");
        return; // Interrompe a execução do código
    }

    if (!/\d/.test(senha)) {
        mensagemErro.textContent = "A senha deve conter pelo menos um número.";
        console.log("A senha deve conter pelo menos um número.");
        return; // Interrompe a execução do código
    }

    if (!/[A-Z]/.test(senha)) {
        mensagemErro.textContent = "A senha deve conter pelo menos uma letra maiúscula.";
        console.log("A senha deve conter pelo menos uma letra maiúscula.");
        return; // Interrompe a execução do código
    }

    if (!/[a-z]/.test(senha)) {
        mensagemErro.textContent = "A senha deve conter pelo menos uma letra minúscula.";
        console.log("A senha deve conter pelo menos uma letra minúscula.");
        return; // Interrompe a execução do código
    }
    

    fetch("/trocar-senha", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            senha: senha,
            confirmarSenha: confirmarSenha
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
            mensagemErro.textContent = data.mensagem; // Exibe a mensagem de erro recebida do servidor
            console.log(data.mensagem); // Exibe a mensagem de erro no console
        }
    })
    .catch(function(error) { // Captura qualquer erro que ocorra durante a requisição
        console.error("Erro na requisição:", error); // Exibe o erro no console
        mensagemErro.textContent = "Erro na requisição"; // Exibe uma mensagem de erro genérica
    });
    
});