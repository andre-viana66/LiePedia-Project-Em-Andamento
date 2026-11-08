-- Tabelas do LiePedia (PostgreSQL / Supabase)

CREATE TABLE IF NOT EXISTS usuarios (
    id        SERIAL PRIMARY KEY,
    usuario   VARCHAR(20)  NOT NULL UNIQUE,
    email     VARCHAR(255) NOT NULL UNIQUE,
    senha     VARCHAR(255) NOT NULL, -- hash gerado por password_hash() no PHP
    criado_em TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS token_redefinicao (
    id         SERIAL PRIMARY KEY,
    usuario_id INTEGER      NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL,
    criado_em  TIMESTAMPTZ  NOT NULL DEFAULT now()
);

-- RLS ligado: a API pública do Supabase (chave anon) não enxerga nada.
-- Só o usuário do PHP (liepedia_app) tem acesso, pelas policies abaixo.
ALTER TABLE usuarios          ENABLE ROW LEVEL SECURITY;
ALTER TABLE token_redefinicao ENABLE ROW LEVEL SECURITY;
