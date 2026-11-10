<?php
// Porta de entrada do PHP na Vercel. A Vercel só roda PHP que está dentro de api/,
// então o vercel.json manda todo pedido "*.php" para cá, e este arquivo executa o PHP
// original da pasta da tela. Assim o projeto continua organizado por telas.
// Ao criar um novo arquivo .php que o front-end chama, adicione-o nesta lista.
$permitidos = [
    'tela_login/login',
    'tela_cadastro/cadastro',
    'tela_esqueceu_senha/esqueceu_senha',
    'tela_esqueceu_senha/tela_troca_de_senha/troca_de_senha',
    'tela_esqueceu_senha/tela_validacao_token/validacao_token',
];

$arquivo = $_GET['arquivo'] ?? '';
if (!in_array($arquivo, $permitidos, true)) { // lista fechada: impede executar qualquer outro arquivo
    http_response_code(404);
    exit;
}

chdir(__DIR__ . '/../' . dirname($arquivo)); // faz os require '../config/...' funcionarem como no local
require basename($arquivo) . '.php';
