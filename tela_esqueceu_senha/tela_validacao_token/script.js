const mensagemErro = document.getElementById('MensagemErro');
const mensagemSucesso = document.getElementById('MensagemSucesso');
const formulario = document.getElementById('FormularioValidacaoToken');

// O link do e-mail traz ?token=...; preenche o campo para a pessoa não precisar digitar
const tokenDaUrl = new URLSearchParams(window.location.search).get('token');
if (tokenDaUrl) {
    document.getElementById('token').value = tokenDaUrl;
}

function limparMensagens() {
    mensagemErro.textContent = '';
    mensagemSucesso.textContent = '';
}

formulario.addEventListener('submit', function(event) {
    event.preventDefault();
    const token = document.getElementById('token').value.trim();
    if (token === '') {
        mensagemErro.textContent = 'Digite o token enviado para o seu e-mail.';
        console.log('Por favor, insira o token.');
        return;
    }
    if (token.length !== 6) {
        mensagemErro.textContent = 'Digite o token completo, com 6 caracteres.';
        console.log('O token deve ter exatamente 6 dígitos.');
        return;
    }
    limparMensagens();
    
     fetch("validacao_token.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            token: token
        })
    })

    .then(function (response) {
        return response.json();
    })

    .then(function (data) { // Recebe os dados do servidor
        if (data.sucesso) { // Verifica se o login foi bem-sucedido
            console.log("Token validado com sucesso!"); // Exibe uma mensagem de sucesso no console
            window.location.href = "../tela_troca_de_senha/troca_de_senha.html?token=" + encodeURIComponent(token) // Redireciona para a tela de troca de senha
        } else {
            mensagemErro.textContent = data.mensagem; // Exibe a mensagem de erro recebida do servidor
            console.log(data.mensagem); // Exibe a mensagem de erro no console
        }
    })
    .catch(function(error) { // Captura qualquer erro que ocorra durante a requisição
        console.error("Erro na requisição:", error); // Exibe o erro no console
        mensagemErro.textContent = "Não foi possível validar o token. Verifique sua conexão e tente novamente."; // Exibe uma mensagem de erro genérica
    });
})