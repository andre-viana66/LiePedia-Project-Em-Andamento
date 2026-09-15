<?php

header('Content-Type: application/json'); // Define o tipo de conteúdo da resposta como JSON
require_once '../config/database.php'; // Inclui o arquivo de configuração do banco de dados
$dados = json_decode(file_get_contents("php://input"), true); // Decodifica os dados JSON recebidos na requisição


$email = trim($dados["email"] ?? ""); //Obtém o valor do campo 'email' e remove espaços em branco e define como string vazia se não estiver definido
$senha = trim($dados["senha"] ?? ""); // Obtém o valor do campo 'senha' e remove espaços em branco e define como string vazia se não estiver definido

