<?php
$host = 'localhost'; // Host do banco de dados
$porta = '5432'; // Porta do banco de dados
$nomeBanco = "Liepedia-Database"; // Nome do banco de dados
$usuario = "postgres"; // Usuário do banco de dados
$senha = "12345"; // Senha do banco de dados

try{
    $dns = "pgsql:host=$host;port=$porta;dbname=$nomeBanco"; // Data Source Name (DSN) para conexão com o banco de dados PostgreSQL
    $pdo = new PDO($dns, $usuario, $senha); // Cria uma nova instância de PDO para conexão com o banco de dados
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // Define o modo de erro do PDO para lançar exceções
}catch(PDOException $e){
    header("Content-Type: application/json"); // Define o tipo de conteúdo da resposta como JSON
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'Erro ao conectar ao banco de dados: ' . $e->getMessage()
    ]); // Retorna uma resposta JSON indicando que houve um erro ao conectar ao banco de dados
    exit; // Encerra a execução do script
}
