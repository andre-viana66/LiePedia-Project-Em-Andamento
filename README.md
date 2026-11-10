# Liepedia 🌐

**A Wikipédia das mentiras** — projeto acadêmico desenvolvido para a disciplina de programação front-end, como parte do curso de Ciência da computação.

Liepedia é uma enciclopédia colaborativa fictícia, onde os usuários podem criar, editar e pesquisar artigos "inventados" de forma bem-humorada. O projeto simula uma plataforma real de wiki, cobrindo autenticação de usuários, criação de conteúdo e busca de artigos.

🔗 **Site no ar:** https://liepedia.vercel.app

## 📋 Status do projeto

🚧 Em desenvolvimento

- [x] Tela de login (front-end + back-end)
- [x] Tela de cadastro (front-end + back-end)
- [x] Tela principal
- [x] Banco de dados (PostgreSQL no Supabase)
- [x] Deploy (Vercel)
- [ ] Recuperação de senha por email (envio do token pronto; troca da senha incompleta)
- [ ] Tela de pesquisa de artigos
- [ ] Tela de criação/edição de artigos

## 🎯 Objetivo

Este projeto foi desenvolvido com fins educacionais, aplicando na prática conceitos de:

- Desenvolvimento front-end (HTML, CSS e JavaScript)
- Desenvolvimento back-end (API e lógica de servidor)
- Modelagem e integração com banco de dados
- Versionamento de código com Git/GitHub
- Deploy de aplicação na nuvem

## 🛠️ Tecnologias utilizadas

| Camada | Tecnologia |
|---|---|
| Front-end | HTML5, CSS3, JavaScript |
| Back-end | PHP 8 (+ PHPMailer para emails) |
| Banco de dados | PostgreSQL, hospedado no [Supabase](https://supabase.com) |
| Hospedagem | [Vercel](https://vercel.com) |
| Versionamento | Git e GitHub |

## 📁 Estrutura do projeto

Cada tela tem sua própria pasta com o HTML, CSS, JS e o PHP que ela usa.

```
LiePediaProject/
├── api/
│   └── index.php                 # porta de entrada do PHP na Vercel (ver "Como funciona")
├── config/
│   └── database.php              # conexão com o PostgreSQL
├── database/
│   └── schema.sql                # script de criação das tabelas
├── Imagens/                      # logos e ícones
├── tela_principal/               # página inicial (liepedia.html)
├── tela_login/                   # login-index.html + login.php
├── tela_cadastro/                # cadastro-index.html + cadastro.php
├── tela_esqueceu_senha/          # esqueceu_senha.html + esqueceu_senha.php
│   ├── src/                      # PHPMailer
│   └── tela_troca_de_senha/      # troca_de_senha.html + troca_de_senha.php
├── vercel.json                   # configuração do deploy
├── .vercelignore                 # arquivos que não sobem para a Vercel
└── README.md
```

## ⚙️ Como funciona

```
Navegador ──(HTML/CSS/JS)──> Vercel
    │
    └─ fetch("login.php") ──> Vercel ──> api/index.php ──> tela_login/login.php ──> Supabase (PostgreSQL)
```

1. A **Vercel** entrega as telas (HTML, CSS, JS) como arquivos comuns.
2. Quando o JavaScript faz `fetch("login.php")`, a Vercel precisa rodar PHP. Ela só executa PHP dentro da pasta `api/`, então o `vercel.json` manda **todo pedido `*.php`** para `api/index.php`, que executa o arquivo PHP original da tela.
3. O PHP conecta no banco pelo `config/database.php` e responde um JSON (`sucesso` e `mensagem`) para o JavaScript.
4. Senhas e endereços do banco **nunca ficam no código**: o PHP lê das variáveis de ambiente (`getenv`).

| Variável | Para que serve |
|---|---|
| `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` | Conexão com o banco do Supabase |
| `EMAIL_PASSWORD` | Senha de app do Gmail `liepediasuporte@gmail.com` |

Na Vercel elas ficam em **Settings → Environment Variables**. No PC, ficam no arquivo `.env` (que está no `.gitignore` e não vai para o GitHub); o `config/database.php` carrega esse arquivo automaticamente.

> ⚠️ Ao criar um **novo arquivo `.php`** que o front-end chama, adicione o caminho dele na lista `$permitidos` de `api/index.php`. Sem isso, o site responde 404 (por segurança, só os arquivos da lista podem ser executados).

## 🚀 Como executar no seu PC

### Pré-requisitos

- [PHP](https://www.php.net/downloads) 8+ com a extensão `pdo_pgsql` habilitada
- [Node.js](https://nodejs.org) (só para fazer deploy)

### Passo a passo

1. Clone o repositório:
   ```bash
   git clone https://github.com/andre-viana66/LiePedia-Project-Em-Andamento.git
   cd LiePedia-Project-Em-Andamento
   ```

2. Escolha o banco:
   - **PostgreSQL local:** crie o banco `Liepedia-Database` e rode `database/schema.sql` nele. O `config/database.php` usa `localhost`, usuário `postgres` e senha `12345` quando não existe o arquivo `.env`.
   - **Banco do Supabase:** peça o arquivo `.env` para quem administra o projeto e coloque na raiz do projeto. O `config/database.php` lê esse arquivo sozinho.

3. Inicie o servidor embutido do PHP na pasta do projeto:
   ```bash
   php -S localhost:8000
   ```

4. Acesse no navegador: http://localhost:8000/tela_principal/liepedia.html

## ☁️ Deploy

- **Publicar uma nova versão** (na pasta do projeto):
  ```bash
  npx vercel deploy --prod
  ```
  Na primeira vez, rode `npx vercel login` e `npx vercel link` (projeto `liepedia`).
- **Mudou a estrutura do banco?** Atualize `database/schema.sql` e rode a mudança no **SQL Editor** do Supabase (projeto `liepedia`).
- **Ver os dados cadastrados:** Supabase → projeto `liepedia` → **Table Editor**.

## 👥 Integrantes do grupo

- André Viana
- Lucas
- Dg
- Thalirson
- Isack

## 📄 Licença

Projeto acadêmico, sem fins comerciais.
