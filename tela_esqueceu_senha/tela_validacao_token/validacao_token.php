<?php
    header("Content-Type: application/json"); // Define o tipo de conteúdo da resposta como JSON
    require_once '../../config/database.php'; //Inclui o arquivo de configuração do banco de dados
    $dados = json_decode(file_get_contents("php://input"), true); // Decodifica os dados JSON recebidos na requisição

    $token = trim($dados['token'] ?? ''); // Obtém o valor do campo 'token' e remove espaços em branco e define como string vazia se não estiver definido

    if (empty($token)) { // Verifica se o campo de token está vazio
        echo json_encode([
            'sucesso' => false,
            'mensagem' => 'O campo de token é obrigatório.'
        ]); // Retorna uma resposta JSON indicando que o campo de token é obrigatório
        exit; // Encerra a execução do script
    }

    if (strlen($token) !== 6) { // Verifica se o token não tem exatamente 6 caracteres
        echo json_encode([
            'sucesso' => false,
            'mensagem' => 'O token deve ter exatamente 6 caracteres.'
        ]); // Retorna uma resposta JSON indicando que o token deve ter exatamente 6 caracteres
        exit; // Encerra a execução do script
    }

    $tokenHash = hash('sha256', $token); // Criptografa o token fornecido

    $smt = $pdo->prepare("SELECT usuario_id FROM token_redefinicao WHERE token_hash = :token_hash"); // Prepara a consulta SQL para verificar se o token existe
    $smt->execute(['token_hash' => $tokenHash]); // Executa a consulta SQL com os parâmetros fornecidos
    $usuarioId = $smt->fetchColumn(); // Obtém o ID do usuário correspondente ao token fornecido, se existir

    if ($usuarioId) { // Verifica se o token é válido
        echo json_encode([
            'sucesso' => true,
            'mensagem' => 'Token válido. Redirecionando para a tela de redefinição de senha.',
            'usuario_id' => $usuarioId,
        ]); // Retorna uma resposta JSON indicando que o token é válido e inclui o ID do usuário
    } else {
        echo json_encode([
            'sucesso' => false,
            'mensagem' => 'Token inválido. Por favor, verifique o token fornecido.'
        ]); // Retorna uma resposta JSON indicando que o token é inválido
    }



?>