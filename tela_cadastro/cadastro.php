<?php
header("Content-Type: application/json"); // Define o tipo de conteúdo da resposta como JSON
require_once '../config/database.php'; // Inclui o arquivo de configuração do banco de dados
$dados = json_decode(file_get_contents("php://input"), true); // Decodifica os dados JSON recebidos na requisição


$usuario = trim($dados['usuario'] ?? ''); // Obtém o valor do campo 'usuario' e remove espaços em branco e define como string vazia se não estiver definido
$email = trim($dados['email'] ?? ''); // Obtém o valor do campo 'email' e remove espaços em branco e define como string vazia se não estiver definido
$senha = trim($dados['senha'] ?? ''); // Obtém o valor do campo 'senha' e remove espaços em branco e define como string vazia se não estiver definido
$confirmarSenha = trim($dados['confirmarSenha'] ?? ''); // Obtém o valor do campo 'confirmarSenha' e remove espaços em branco e define como string vazia se não estiver definido

if (empty($usuario) || empty($email) || empty($senha) || empty($confirmarSenha)) {
    echo json_encode(array(
        'sucesso' => false,
        'mensagem' => 'Todos os campos são obrigatórios.'
        )); // Retorna uma resposta JSON indicando que todos os campos são obrigatórios
    exit; // Encerra a execução do script
}

if (!preg_match('/^[a-zA-Z0-9_]+$/', $usuario)) { //verifica se o usuário contém apenas letras, números e underscores
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'O nome de usuário não pode conter caracteres especiais.'
    ]); //retorna uma resposta JSON indicando que o nome de usuário só pode conter letras, números e underscores
    exit; // Encerra a execução do script
}

if (strlen($usuario) < 3 || strlen($usuario) > 20) { //verifica se o usuário tem entre 3 e 20 caracteres
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'O nome de usuário deve ter entre 3 e 20 caracteres.'
    ]); //retorna uma resposta JSON indicando que o nome de usuário deve ter entre 3 e 20 caracteres
    exit; // Encerra a execução do script
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) { // verifica se o email é válido
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'O email fornecido não é válido.'
    ]); //retorna uma resposta JSON indicando que o email fornecido não é válido
    exit; // Encerra a execução do script
}

if ($senha !== $confirmarSenha) { //verifica se a senha e a confirmação de senha são iguais
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'As senhas não coincidem.'
    ]); //retorna uma resposta JSON indicando que as senhas não coincidem
    exit; // Encerra a execução do script
}


if (strlen($senha) < 8) { //verifica se a senha tem pelo menos 8 caracteres
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'A senha deve ter pelo menos 8 caracteres.'
    ]); //retorna uma resposta JSON indicando que a senha deve ter pelo menos 8 caracteres
    exit; // Encerra a execução do script
}

if (!preg_match('/[A-Z]/', $senha)) { //verifica se a senha contém pelo menos uma letra maiúscula
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'A senha deve conter pelo menos uma letra maiúscula.'
    ]); //retorna uma resposta JSON indicando que a senha deve conter pelo menos uma letra maiúscula
    exit; // Encerra a execução do script
}

if (!preg_match('/[a-z]/', $senha)) { //verifica se a senha contém pelo menos uma letra minúscula
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'A senha deve conter pelo menos uma letra minúscula.'
    ]); //retorna uma resposta JSON indicando que a senha deve conter pelo menos uma letra minúscula
    exit; // Encerra a execução do script
}

if (!preg_match('/[0-9]/', $senha)) { //verifica se a senha contém pelo menos um número
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'A senha deve conter pelo menos um número.'
    ]); //retorna uma resposta JSON indicando que a senha deve conter pelo menos um número
    exit; // Encerra a execução do script
}

if (!preg_match('/[\W_]/', $senha)) { //verifica se a senha contém pelo menos um caractere especial
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'A senha deve conter pelo menos um caractere especial.'
    ]); //retorna uma resposta JSON indicando que a senha deve conter pelo menos um caractere especial
    exit; // Encerra a execução do script
}


$senhaHash = password_hash($senha, PASSWORD_DEFAULT); // Cria um hash da senha usando o algoritmo padrão

try {
    $smt = $pdo->prepare("SELECT ID FROM usuarios WHERE usuario = :usuario OR email = :email"); // Prepara uma consulta SQL para verificar se o usuário ou email já existe
    $smt->execute(['usuario' => $usuario, 'email' => $email]); // Executa a consulta SQL com os parâmetros fornecidos

    if ($smt->fetch()) { // Verifica se a consulta retornou algum resultado, ou seja, se o usuário ou email já existe
        echo json_encode([
            'sucesso' => false,
            'mensagem' => 'O nome de usuário ou email já está em uso.'
        ]); // Retorna uma resposta JSON indicando que o nome de usuário ou email já está em uso
        exit;
    }

    $smt = $pdo->prepare("INSERT INTO usuarios (usuario, email, senha) VALUES (:usuario, :email, :senha)"); // Prepara uma consulta SQL para inserir um novo usuário
    $smt->execute(['usuario' => $usuario, 'email' => $email, 'senha' => $senhaHash]); // Executa a consulta SQL com os parâmetros fornecidos

    echo json_encode([ // Retorna uma resposta JSON indicando que o cadastro foi realizado com sucesso
        'sucesso' => true,
        'mensagem' => 'Cadastro realizado com sucesso.'
    ]); // Retorna uma resposta JSON indicando que o cadastro foi realizado com sucesso


} catch (PDOException $e) {
    echo json_encode([ // Retorna uma resposta JSON indicando que houve um erro ao realizar o cadastro
        'sucesso' => false,
        'mensagem' => 'Erro ao realizar o cadastro: ' . $e->getMessage()
    ]); // Retorna uma resposta JSON indicando que houve um erro ao realizar o cadastro
    exit; // Encerra a execução do script
}