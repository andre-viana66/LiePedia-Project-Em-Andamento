const formulario = document.getElementById("FormularioTrocaSenha"); // Obtém o formulário pelo ID
const mensagemErro = document.getElementById("MensagemErro"); // Obtém o elemento de mensagem de erro pelo ID
const mensagemSucesso = document.getElementById("MensagemSucesso"); // Obtém o elemento de mensagem de sucesso pelo ID

function limparErro(){
    mensagemErro.textContent = ""; // Limpa a mensagem de erro
}

formulario.addEventListener("submit", function(event) {
    event.preventDefault();
    const senha = document.getElementById("senha").value; // Obtém o valor do campo de senha
    const confirmarSenha = document.getElementById("confirmaSenha").value; // Obtém o valor do campo de confirmação de senha


    if (senha.trim() === "" || confirmarSenha.trim() === ""){
        mensagemErro.textContent = "Preencha todos os campos."; // Exibe a mensagem de erro
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
    limparErro();
    mensagemSucesso.textContent = "";

    const token = new URLSearchParams(window.location.search).get("token") || ""; // Token que veio da tela de validação (?token=...)

    fetch("troca_de_senha.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            senha: senha,
            confirmarSenha: confirmarSenha,
            token: token
        })
    })
    .then(function (response) { // Recebe a resposta da requisição
        return response.json(); // Converte a resposta em JSON
    })

    .then(function (data) { // Recebe os dados do servidor
        if (data.sucesso) { // Verifica se o login foi bem-sucedido
            mensagemSucesso.textContent = data.mensagem + " Redirecionando para o login..."; // Mostra que deu certo antes de sair da tela
            setTimeout(function () {
                window.location.href = "../../tela_login/login-index.html"; // ../../ sobe 2 pastas (tela_troca_de_senha → tela_esqueceu_senha → raiz)
            }, 2000); // Espera 2 segundos para a pessoa conseguir ler a mensagem
        } else {
            mensagemErro.textContent = data.mensagem; // Exibe a mensagem de erro recebida do servidor
            console.log(data.mensagem); // Exibe a mensagem de erro no console
        }
    })
    .catch(function(error) { // Captura qualquer erro que ocorra durante a requisição
        console.error("Erro na requisição:", error); // Exibe o erro no console
        mensagemErro.textContent = "Não foi possível alterar a senha. Verifique sua conexão e tente novamente."; // Exibe uma mensagem de erro genérica
    });
    
});