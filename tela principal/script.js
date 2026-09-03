// Referencia o botão "Criar conta" pelo id, guardando o elemento numa constante
const btnCriarConta = document.getElementById('btnCriarConta');

// Referencia o botão "Entrar" pelo id, guardando o elemento numa constante
const btnEntrar = document.getElementById('btnEntrar');

// Adiciona um "escutador" de clique no botão "Criar conta"
btnCriarConta.addEventListener('click', function() {
    // Ao clicar, redireciona o usuário para a página de cadastro
    // ../ sobe uma pasta (sai de tela_principal) e entra em tela_cadastro
    window.location.href = '../tela_cadastro/cadastro-index.html';
});

// Adiciona um "escutador" de clique no botão "Entrar"
btnEntrar.addEventListener('click', function() {
    // Ao clicar, redireciona o usuário para a página de login
    // ../ sobe uma pasta (sai de tela_principal) e entra em tela_login
    window.location.href = '../tela_login/login-index.html';
});