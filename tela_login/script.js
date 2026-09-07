var FormularioLogin = document.getElementById("FormularioLogin");
const mensagemErro = document.getElementById("MensagemVaziaLogin"); // Obtém o elemento de mensagem de erro


function ValidarEspacosEmBrancoLogin(email, senha) {
    return (email.trim() === "" || senha.trim() === ""); // Verifica se algum dos campos está vazio
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
    };
    limparMensagemErro(); // Limpa a mensagem de erro se os campos estiverem preenchidos

    
})
