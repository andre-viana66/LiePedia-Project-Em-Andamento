<?php
// No PC: carrega o arquivo .env automaticamente (na Vercel ele não existe; lá valem as Environment Variables).
$arquivoEnv = __DIR__ . '/../.env';
if (is_file($arquivoEnv)) {
    foreach (file($arquivoEnv, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $linha) {
        if (preg_match('/^(\w+)=(.*)$/', $linha, $m)) putenv("$m[1]=$m[2]"); // ignora comentários (#)
    }
}

// Na Vercel os dados vêm das Environment Variables (banco do Supabase).
// No seu PC, sem essas variáveis, usa o PostgreSQL local (valores depois do ?:).
$host = getenv('DB_HOST') ?: 'localhost'; // Host do banco de dados
$porta = getenv('DB_PORT') ?: '5432'; // Porta do banco de dados
$nomeBanco = getenv('DB_NAME') ?: "Liepedia-Database"; // Nome do banco de dados
$usuario = getenv('DB_USER') ?: "postgres"; // Usuário do banco de dados
$senha = getenv('DB_PASSWORD') ?: "12345"; // Senha do banco de dados

try{
    $dns = "pgsql:host=$host;port=$porta;dbname=$nomeBanco"; // Data Source Name (DSN) para conexão com o banco de dados PostgreSQL
    if (getenv('DB_HOST')) $dns .= ';sslmode=require'; // conexão criptografada com o Supabase
    $pdo = new PDO($dns, $usuario, $senha); // Cria uma nova instância de PDO para conexão com o banco de dados
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // Define o modo de erro do PDO para lançar exceções
    $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, true); // o pooler do Supabase (porta 6543) não aceita prepared statements no servidor
}catch(PDOException $e){
    header("Content-Type: application/json"); // Define o tipo de conteúdo da resposta como JSON
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'Erro ao conectar ao banco de dados: ' . $e->getMessage()
    ]); // Retorna uma resposta JSON indicando que houve um erro ao conectar ao banco de dados
    exit; // Encerra a execução do script
}
