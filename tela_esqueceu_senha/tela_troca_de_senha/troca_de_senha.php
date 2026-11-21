<?php
    header("Content-Type: application/json"); // Define o tipo de conteúdo da resposta como JSON
    require_once '../../config/database.php'; //Inclui o arquivo de configuração do banco de dados
    $dados = json_decode(file_get_contents("php://input"), true); // Decodifica os dados JSON recebidos na requisição

    $senha = trim($dados['senha'] ?? ''); // Obtém o valor do campo 'senha' e remove espaços em branco e define como string vazia se não estiver definido
    $confirmarSenha = trim($dados['confirmarSenha'] ?? ''); // Obtém o valor do campo 'confirmarSenha' e remove espaços em branco e define como string vazia se não estiver definido
    $token = trim($dados['token'] ?? ''); // Token do link do email: é ele que prova de quem é a conta (nunca confiar num usuario_id vindo do navegador)


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

    // Passo 1: descobrir o usuário pelo token (só vale por 15 minutos)
    $smt = $pdo->prepare("
        SELECT usuario_id FROM token_redefinicao
        WHERE token_hash = :token_hash
          AND criado_em > now() - interval '15 minutes'
    "); // Procura o token e só aceita se tiver menos de 15 minutos
    $smt->execute(['token_hash' => hash('sha256', $token)]); // Mesmo hash usado ao criar o token no esqueceu_senha.php
    $usuarioId = $smt->fetchColumn(); // ID do dono do token, ou false se não existir/expirou

    if (!$usuarioId) {
        echo json_encode([
            'sucesso' => false,
            'mensagem' => 'Este link expirou. Peça um novo e-mail de recuperação.'
        ]); // Retorna uma resposta JSON indicando que o token é inválido ou expirou
        exit; // Encerra a execução do script
    }

    // Passo 2: buscar a senha atual e as senhas antigas
    $smt = $pdo->prepare("SELECT senha FROM usuarios WHERE id = :id"); // Hash da senha que a pessoa usa hoje
    $smt->execute(['id' => $usuarioId]);
    $hashAtual = $smt->fetchColumn();

    $smt = $pdo->prepare("SELECT senha_hash FROM senha_utilizada WHERE usuario_id = :id"); // Hashes das senhas antigas
    $smt->execute(['id' => $usuarioId]);
    $todosOsHashes = array_merge([$hashAtual], $smt->fetchAll(PDO::FETCH_COLUMN)); // Atual + antigas numa lista só

    // Passo 3: comparar a senha nova com cada uma (password_verify, porque cada hash tem um "sal" diferente)
    foreach ($todosOsHashes as $hash) {
        if (password_verify($senha, $hash)) { // A senha nova "bate" com uma já usada?
            echo json_encode([
                'sucesso' => false,
                'mensagem' => 'Escolha uma senha que você ainda não usou.'
            ]); // Retorna uma resposta JSON indicando que a senha já foi usada
            exit; // Encerra a execução do script
        }
    }

    // Passo 4: salvar tudo junto; se um passo falhar, nada é salvo
    try {
        $pdo->beginTransaction(); // Inicia a transação

        $pdo->prepare("INSERT INTO senha_utilizada (usuario_id, senha_hash) VALUES (:id, :hash)")
            ->execute(['id' => $usuarioId, 'hash' => $hashAtual]); // A senha ATUAL vai para o histórico

        $pdo->prepare("UPDATE usuarios SET senha = :hash WHERE id = :id")
            ->execute(['id' => $usuarioId, 'hash' => password_hash($senha, PASSWORD_DEFAULT)]); // Grava a senha nova (criptografada)

        $pdo->prepare("DELETE FROM token_redefinicao WHERE usuario_id = :id")
            ->execute(['id' => $usuarioId]); // O token não pode ser usado de novo

        $pdo->commit(); // Confirma tudo

        echo json_encode([
            'sucesso' => true,
            'mensagem' => 'Senha alterada. Você já pode entrar com a nova senha.'
        ]); // Retorna uma resposta JSON indicando que a senha foi alterada
    } catch (PDOException $e) {
        if ($pdo->inTransaction()) {
            $pdo->rollBack(); // Deu erro no meio? Desfaz tudo
        }
        echo json_encode([
            'sucesso' => false,
            'mensagem' => 'Não foi possível alterar a senha. Tente novamente.'
        ]); // Retorna uma resposta JSON genérica (sem expor detalhes do banco)
    }
?>