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

-- ---------------------------------------------------------------
-- Usuário que o PHP usa para conectar (DB_USER na Vercel).
-- Rode só ao criar um banco NOVO. Troque a senha antes de rodar.
-- No Supabase o login fica: liepedia_app.<id-do-projeto>
-- ---------------------------------------------------------------
-- CREATE ROLE liepedia_app LOGIN PASSWORD 'troque-esta-senha';
-- GRANT USAGE ON SCHEMA public TO liepedia_app;
-- GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO liepedia_app;

-- Permissões das tabelas (repita este bloco para CADA tabela nova)
GRANT SELECT, INSERT, UPDATE, DELETE ON usuarios TO liepedia_app;
CREATE POLICY app_acesso_total ON usuarios FOR ALL TO liepedia_app USING (true) WITH CHECK (true);

GRANT SELECT, INSERT, UPDATE, DELETE ON token_redefinicao TO liepedia_app;
CREATE POLICY app_acesso_total ON token_redefinicao FOR ALL TO liepedia_app USING (true) WITH CHECK (true);
