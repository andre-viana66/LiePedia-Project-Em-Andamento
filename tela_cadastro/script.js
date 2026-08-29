var formulario = document.getElementById("FormCadastro"); // Obtém o elemento do formulário pelo ID
const mensagemErro = document.getElementById("MensagemErro"); // Obtém o elemento de mensagem de erro pelo ID

formulario.addEventListener("submit", function(event) { //Cria um evento de escuta para o envio do formulário
    event.preventDefault(); // Impede o envio do formulário

    const usuario = document.getElementById("usuario").value; // Obtém o valor do campo de usuário
    const email = document.getElementById("email").value; // Obtém o valor do campo de email
    const senha = document.getElementById("senha").value; // Obtém o valor do campo de senha
    const confirmarSenha = document.getElementById("confirmar-senha").value; // Obtém o valor do campo de confirmação de senha

    if (usuario.trim() === "" || email.trim() === "" || senha.trim() === "" || confirmarSenha.trim() === "") { // Verifica se algum dos campos está vazio
        console.log("Todos os campos são obrigatórios.")
        mensagemErro.textContent= "Todos os campos são obrigatórios."; // Exibe uma mensagem de erro se algum campo estiver vazio
    }

    if (!email.includes("@") || !email.includes(".")){ // Verifica se o email não contém "@" ou "."
        console.log("O email deve conter '@' e '.'.")
        mensagemErro.textContent= "O email deve conter '@' e '.'."; // Exibe uma mensagem de erro se o email não contiver "@" ou "."
    }

    if(senha !== confirmarSenha){ // Verifica se a senha e a confirmação de senha são diferentes
        console.log("As senhas não coincidem.") 
        mensagemErro.textContent= "As senhas não coincidem."; // Exibe uma mensagem de erro se as senhas não coincidirem
    
    }


    console.log(usuario, email, senha, confirmarSenha); // Exibe os valores no console para verificação

});

