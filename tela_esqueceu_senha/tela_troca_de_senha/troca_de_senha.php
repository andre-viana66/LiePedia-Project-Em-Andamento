<?php
    header("Content-Type: application/json"); // Define o tipo de conteúdo da resposta como JSON
    require_once '../../config/database.php'; //Inclui o arquivo de configuração do banco de dados
    $dados = json_decode(file_get_contents("php://input"), true); // Decodifica os dados JSON recebidos na requisição

    $senha = trim($dados['senha'] ?? ''); // Obtém o valor do campo 'senha' e remove espaços em branco e define como string vazia se não estiver definido
    $confirmarSenha = trim($dados['confirmarSenha'] ?? ''); // Obtém o valor do campo 'confirmarSenha' e remove espaços em branco e define como string vazia se não estiver definido


    if (empty($senha) || empty($confirmarSenha)) { // Verifica se os campos de senha e confirmar senha estão vazios
        echo json_encode([
            'sucesso' => false,
            'mensagem' => 'Os campos de senha e confirmar senha são obrigatórios.'
        ]); // Retorna uma resposta JSON indicando que os campos são obrigatórios
        exit; // Encerra a execução do script
    }

    if ($senha !== $confirmarSenha) { // Verifica se as senhas não coincidem
        echo json_encode([
            'sucesso' => false,
            'mensagem' => 'As senhas não coincidem.'
        ]); // Retorna uma resposta JSON indicando que as senhas não coincidem
        exit; // Encerra a execução do script
    }

    if (strlen($senha) < 8) { // Verifica se a senha tem menos de 8 caracteres
        echo json_encode([
            'sucesso' => false,
            'mensagem' => 'A senha deve ter pelo menos 8 caracteres.'
        ]); // Retorna uma resposta JSON indicando que a senha é muito curta
        exit; // Encerra a execução do script
    }

    if (!preg_match('/[A-Z]/', $senha)) { // Verifica se a senha não contém pelo menos uma letra maiúscula
        echo json_encode([
            'sucesso' => false,
            'mensagem' => 'A senha deve conter pelo menos uma letra maiúscula.'
        ]); // Retorna uma resposta JSON indicando que a senha não contém letra maiúscula
        exit; // Encerra a execução do script
    }

    if (!preg_match('/[a-z]/', $senha)) { // Verifica se a senha não contém pelo menos uma letra minúscula
        echo json_encode([
            'sucesso' => false,
            'mensagem' => 'A senha deve conter pelo menos uma letra minúscula.'
        ]); // Retorna uma resposta JSON indicando que a senha não contém letra minúscula
        exit; // Encerra a execução do script
    }

    if (!preg_match('/[0-9]/', $senha)) { // Verifica se a senha não contém pelo menos um número
        echo json_encode([
            'sucesso' => false,
            'mensagem' => 'A senha deve conter pelo menos um número.'
        ]); // Retorna uma resposta JSON indicando que a senha não contém número
        exit; // Encerra a execução do script
    }

    if (!preg_match('/[\W_]/', $senha)) { // Verifica se a senha não contém pelo menos um caractere especial
        echo json_encode([
            'sucesso' => false,
            'mensagem' => 'A senha deve conter pelo menos um caractere especial.'
        ]); // Retorna uma resposta JSON indicando que a senha não contém caractere especial
        exit; // Encerra a execução do script
    }

    $senhaHash = password_hash($senha, PASSWORD_DEFAULT); // Cria um hash da senha usando o algoritmo padrão do PHP
    
?>