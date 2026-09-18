<?php

header('Content-Type: application/json'); // Define o tipo de conteúdo da resposta como JSON
require_once '../config/database.php'; // Inclui o arquivo de configuração do banco de dados
$dados = json_decode(file_get_contents("php://input"), true); // Decodifica os dados JSON recebidos na requisição


$email = trim($dados["email"] ?? ""); //Obtém o valor do campo 'email' e remove espaços em branco e define como string vazia se não estiver definido
$senha = trim($dados["senha"] ?? ""); // Obtém o valor do campo 'senha' e remove espaços em branco e define como string vazia se não estiver definido

if(empty($senha) || empty($email)){
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'Todos os campos são obrigatórios' // Retorna uma resposta JSON indicando que todos os campos são obrigatórios
    ]); 
    exit; // Encerra a execução do script
};

if(!filter_var($email, FILTER_VALIDATE_EMAIL)){ // verifica se o email é válido
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'O email fornecido não é válido.'
    ]); //retorna uma resposta JSON indicando que o email fornecido não é válido
    exit; // Encerra a execução do script
};

if (strlen($senha) < 8){ //verifica se a senha tem pelo menos 8 caracteres
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'A senha deve ter pelo menos 8 caracteres.'
    ]);  //retorna uma resposta JSON indicando que a senha deve ter pelo menos 8 caracteres
    exit; // Encerra a execução do script
};

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






