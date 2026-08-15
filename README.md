# Liepedia 🌐

**A Wikipédia das mentiras** — projeto acadêmico desenvolvido para a disciplina de programação front-end, como parte do curso de Ciência da computação.

Liepedia é uma enciclopédia colaborativa fictícia, onde os usuários podem criar, editar e pesquisar artigos "inventados" de forma bem-humorada. O projeto simula uma plataforma real de wiki, cobrindo autenticação de usuários, criação de conteúdo e busca de artigos.

## 📋 Status do projeto

🚧 Em desenvolvimento

- [x] Tela de login (front-end)
- [ ] Tela de cadastro
- [ ] Tela de pesquisa de artigos
- [ ] Tela de criação/edição de artigos
- [ ] Back-end (autenticação, API)
- [ ] Banco de dados
- [ ] Deploy

## 🎯 Objetivo

Este projeto foi desenvolvido com fins educacionais, aplicando na prática conceitos de:

- Desenvolvimento front-end (HTML, CSS e JavaScript)
- Desenvolvimento back-end (API e lógica de servidor)
- Modelagem e integração com banco de dados
- Versionamento de código com Git/GitHub

## 🛠️ Tecnologias utilizadas

| Camada | Tecnologia |
|---|---|
| Front-end | HTML5, CSS3, JavaScript |
| Back-end | PHP |
| Banco de dados | PostgreSQL |
| Versionamento | Git e GitHub |

## 📁 Estrutura do projeto

```
liepedia/
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── Imagens/
├── backend/
│   ├── config/
│   │   └── database.php       # conexão com o PostgreSQL
│   ├── login.php
│   ├── cadastro.php
│   └── (demais rotas/páginas PHP)
├── database/
│   └── schema.sql              # script de criação das tabelas
├── .gitignore
└── README.md
```

## 🚀 Como executar o projeto

### Pré-requisitos

- [PHP](https://www.php.net/downloads) instalado (versão 8+ recomendada)
- [PostgreSQL](https://www.postgresql.org/download/) instalado e rodando
- Extensão `pdo_pgsql` habilitada no PHP (para conectar ao PostgreSQL)

### Passo a passo

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/liepedia.git
   cd liepedia
   ```

2. Crie o banco de dados no PostgreSQL e rode o script de criação das tabelas:
   ```bash
   psql -U seu_usuario -d nome_do_banco -f database/schema.sql
   ```

3. Copie o arquivo de exemplo e preencha com seus dados reais:
   ```bash
   cp backend/config/database.example.php backend/config/database.php
   ```
   Depois edite `database.php` com usuário, senha e nome do seu banco local.

   > ⚠️ O arquivo `database.php` não deve ser enviado ao GitHub (contém dados sensíveis) — por isso ele já está no `.gitignore`. Apenas o `database.example.php` é versionado.

4. Inicie o servidor embutido do PHP, apontando para a pasta do projeto:
   ```bash
   php -S localhost:8000
   ```

5. Acesse no navegador:
   ```
   http://localhost:8000/frontend/index.html
   ```

> ⚠️ Enquanto o back-end ainda não está pronto, é possível visualizar só a interface abrindo `frontend/index.html` diretamente no navegador.

## 🖼️ Preview

![alt text](image.png)

## 👥 Integrantes do grupo

- André Viana
- Lucas
- Dg
- Thalirson
- Isack

## 📄 Licença

Projeto acadêmico, sem fins comerciais.
