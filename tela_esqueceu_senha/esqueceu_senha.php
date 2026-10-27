<?php

ini_set('display_errors', '0'); // Desativa a exibição de erros na tela
error_reporting(E_ALL); // Define o nível de relatório de erros para exibir todos os tipos de erros

// Lógica para enviar o email de recuperação de senha
header("Content-Type: application/json"); // Define o tipo de conteúdo da resposta como JSON
require_once '../config/database.php'; //Inclui o arquivo de configuração do banco de dados
$dados = json_decode(file_get_contents("php://input"), true); // Decodifica os dados JSON recebidos na requisição

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require_once __DIR__ . '/src/PHPMailer.php';
require_once __DIR__ . '/src/SMTP.php';
require_once __DIR__ . '/src/Exception.php';
$envio_email = new PHPMailer(true); // Cria uma nova instância da classe PHPMailer



$email = trim($dados['email'] ?? ''); // Obtém o valor do campo 'email' e remove espaços em branco e define como string vazia se não estiver definido

if (empty($email)) {
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'O campo de email é obrigatório.'
    ]); // Retorna uma resposta JSON indicando que o campo de email é obrigatório
    exit; // Encerra a execução do script   
    }

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) { // verifica se o email é válido
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'O email fornecido não é válido.'
    ]); //retorna uma resposta JSON indicando que o email fornecido não é válido
    exit; // Encerra a execução do script
}

$smt = $pdo->prepare("SELECT ID FROM usuarios WHERE email = :email"); // Prepara a consulta SQL para verificar se o email existe
$smt->execute(['email' => $email]); // Executa a consulta SQL com os parâmetros fornecidos
$usuarioId = $smt->fetchColumn(); // Obtém o ID do usuário correspondente ao email fornecido, se existir

if ($usuarioId) { // Verifica se o usuário existe no banco de dados

    try {
        $token = bin2hex(random_bytes(3));
        $tokenHash = password_hash($token, PASSWORD_DEFAULT); // Criptografa o token gerado

        $smtToken = $pdo->beginTransaction(); // Inicia uma transação no banco de dados
        $smtToken = $pdo->prepare("INSERT INTO token_redefinicao (usuario_id, token_hash) 
                       VALUES (:usuario_id, :token_hash)")
                    ->execute(['usuario_id' => $usuarioId, 'token_hash' => $tokenHash]); // Insere o token criptografado no banco de dados
 
        $smtToken = $pdo->commit(); // Confirma a transação no banco de dado

        $envio_email->SMTPDebug = 2; // Ativa o modo de depuração do SMTP
        $envio_email->isSMTP(); // Define que o envio será feito via SMTP
        $envio_email->Host = 'smtp.gmail.com'; // Define o host do servidor SMTP
        $envio_email->SMTPAuth = true; // Ativa a autenticação SMTP
        $envio_email->Username = 'liepediasuporte@gmail.com'; // Define o nome de usuário para autenticação SMTP
        $envio_email->Password ="your password";//getenv('email_key'); // Define a senha para autenticação SMTP
        $envio_email->Port = 587; // Define a porta do servidor SMTP
        $envio_email->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Define o tipo de criptografia para a conexão SMTP
        $envio_email->Debugoutput = 'error_log'; // Define o destino do log de depuração do SMTP
        $envio_email->CharSet = 'UTF-8'; // Define o conjunto de caracteres para o email  

        $envio_email->setFrom('liepediasuporte@gmail.com', 'Suporte LiePedia'); // Define o endereço de email do remetente
        $envio_email->addAddress($email); // Adiciona o endereço de email do destinatário
        $envio_email->isHTML(true); // Define que o email será enviado em formato HTML

        $envio_email->Subject = 'Recuperação de senha'; // Define o assunto do email
        $envio_email->Body = 'Olá, você solicitou a recuperação de senha. Clique no link abaixo para redefinir sua senha: <link>http://localhost:8000/tela_esqueceu_senha/tela_troca_de_senha/troca_de_senha.html?token=</link> Seu token é: ' . $token; // Define o corpo do email
        $envio_email->AltBody = 'Olá, você solicitou a recuperação de senha. Clique no link abaixo para redefinir sua senha: <link>http://localhost:8000/tela_esqueceu_senha/tela_troca_de_senha/troca_de_senha.html?token=</link> Seu token é: ' . $token; // Define o corpo alternativo do email
        $envio_email->send(); // Envia o email

        if ($envio_email->send()) { // Tenta enviar o email
            echo json_encode([
                'sucesso' => true,
                'mensagem' => 'Se o email existir, você receberá um email com instruções para redefinir sua senha.'          
            ]); // Retorna uma resposta JSON indicando que o email foi enviado com sucesso

        } else {
            echo json_encode([
                'sucesso' => false,
                'mensagem' => 'Se o email existir, você receberá um email com instruções para redefinir sua senha.'
            ]); // Retorna uma resposta JSON indicando que houve um erro ao enviar o email
        }

        exit; // Encerra a execução do script
    } catch (\Throwable $e) {
        if ($pdo->inTransaction()) {
            $pdo->rollBack(); // Desfaz a transação no banco de dados em caso de erro
        }
        echo json_encode([
            'sucesso' => false,
            'mensagem' => 'Se o email existir, você receberá um email com instruções para redefinir sua senha.',
            'debug' => $e->getMessage()
        ]); // Retorna uma resposta JSON indicando que houve um erro ao enviar o email
        exit; // Encerra a execução do script
    }
} else { // Caso não exista nenhum usuário no banco de dados retorna uma mensagem negativa
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'Se o email existir, você receberá um email com instruções para redefinir sua senha.'
    ]);
}
?>

