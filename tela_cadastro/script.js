var formulario = document.getElementById("FormCadastro"); // Obtém o elemento do formulário pelo ID
const mensagemErro = document.getElementById("MensagemErro"); // Obtém o elemento de mensagem de erro pelo ID




function ValidarEspacosEmBranco(email, senha, confirmarSenha, usuario) {
    return email.trim() === "" || senha.trim() === "" || confirmarSenha.trim() === "" || usuario.trim() === ""; // Retorna verdadeiro se algum campo estiver vazio
}

function validarTamanhoUsuario(usuario) {
    return usuario.length >= 3 && usuario.length <= 20; // Retorna verdadeiro se o tamanho do usuário estiver entre 3 e 20 caracteres
}

function validarCaracteresEspeciais(usuario) {
    const regex = /^[a-zA-Z0-9]+$/; // Expressão regular para permitir apenas letras e números
    return regex.test(usuario); // Retorna verdadeiro se o usuário não contiver caracteres especiais
}

function validarEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expressão regular para validar o formato do email
    return emailRegex.test(email); // Retorna verdadeiro se o email estiver no formato correto
}

function validarTamanhoSenha(senha) {
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

function senhasConferem(senha, confirmarSenha) {
    return senha === confirmarSenha; // Retorna verdadeiro se a senha e a confirmação de senha forem iguais
}

function limparErro(){
    mensagemErro.textContent = ""; // Limpa a mensagem de erro
}

formulario.addEventListener("submit", function(event) { //Cria um evento de escuta para o envio do formulário
    event.preventDefault(); // Impede o envio do formulário

    const usuario = document.getElementById("usuario").value; // Obtém o valor do campo de usuário
    const email = document.getElementById("email").value; // Obtém o valor do campo de email
    const senha = document.getElementById("senha").value; // Obtém o valor do campo de senha
    const confirmarSenha = document.getElementById("confirmar-senha").value; // Obtém o valor do campo de confirmação de senha

    if (ValidarEspacosEmBranco(email, senha, confirmarSenha, usuario)) { // Verifica se algum dos campos está vazio
        console.log("Todos os campos são obrigatórios.");
        mensagemErro.textContent= "Todos os campos são obrigatórios.";
        return; // Exibe uma mensagem de erro se algum campo estiver vazio
    }

    if (!validarTamanhoUsuario(usuario)) {
        console.log("O nome de usuário deve ter entre 3 e 20 caracteres.")
        mensagemErro.textContent = "O nome de usuário deve ter entre 3 e 20 caracteres."; // Exibe uma mensagem de erro se o tamanho do usuário não estiver entre 3 e 20 caracteres
        return;
    }

    if (!validarCaracteresEspeciais(usuario)) {
        console.log("O nome de usuário não pode conter caracteres especiais.")
        mensagemErro.textContent= "O nome de usuário não pode conter caracteres especiais.";
        return; // Exibe uma mensagem de erro se o usuário contiver caracteres especiais
    }

    if (!validarEmail(email)) { // Verifica se o email está no formato correto
        console.log("O email não está no formato correto.")
        mensagemErro.textContent= "O email não está no formato correto."; // Exibe uma mensagem de erro se o email não estiver no formato correto
        return;
    }

    if(!senhasConferem(senha, confirmarSenha)){ // Verifica se a senha e a confirmação de senha são diferentes
        console.log("As senhas não coincidem.") 
        mensagemErro.textContent= "As senhas não coincidem."; // Exibe uma mensagem de erro se as senhas não coincidirem
        return;
    
    }
    
    if (!validarTamanhoSenha(senha)) { // Verifica se a senha tem pelo menos 8 caracteres
        console.log("A senha deve ter pelo menos 8 caracteres.")
        mensagemErro.textContent= "A senha deve ter pelo menos 8 caracteres."; // Exibe uma mensagem de erro se a senha tiver menos de 8 caracteres
        return;
    }

    if (!validarCaracteresEspeciaisSenha(senha)) { // Verifica se a senha contém caracteres especiais
        console.log("A senha deve conter pelo menos um caractere especial.")
        mensagemErro.textContent = "A senha deve conter pelo menos um caractere especial."; // Exibe uma mensagem de erro se a senha não contiver caracteres especiais
        return;
    }

    if (!validarLetrasMaiusculas(senha)) { // Verifica se a senha contém letras maiúsculas
        console.log("A senha deve conter pelo menos uma letra maiúscula.")
        mensagemErro.textContent = "A senha deve conter pelo menos uma letra maiúscula."; // Exibe uma mensagem de erro se a senha não contiver letras maiúsculas
        return;
    }

    if (!validarLetrasMinusculas(senha)) { // Verifica se a senha contém letras minúsculas
        console.log("A senha deve conter pelo menos uma letra minúscula.")
        mensagemErro.textContent = "A senha deve conter pelo menos uma letra minúscula."; // Exibe uma mensagem de erro se a senha não contiver letras minúsculas
        return;
    }

    if (!validarNumeros(senha)) { // Verifica se a senha contém números
        console.log("A senha deve conter pelo menos um número.")
        mensagemErro.textContent = "A senha deve conter pelo menos um número."; // Exibe uma mensagem de erro se a senha não contiver números
        return;
    }

    limparErro(); // Limpa a mensagem de erro antes de exibir os valores no console

    console.log(usuario, email, senha, confirmarSenha); // Exibe os valores no console para verificação

});

