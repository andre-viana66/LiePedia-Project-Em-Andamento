/* ===========================================================
   Liepedia — script.js
   ===========================================================
   Lógica da página principal.

   IMPORTANTE (mesma lógica de sempre):

   - O site ainda não tem back-end/banco de dados de verdade.
     Os "artigos" ficam guardados no localStorage do navegador.
   - No primeiro acesso o array de artigos está vazio ([]), então
     a seção "Artigos em destaque" nasce mostrando um estado
     vazio, convidando a pessoa a criar o primeiro artigo.
   - Quando alguém "publicar" (via LiePedia.publicarArtigo), o
     card entra na grade automaticamente.
   - Pra funcionar de verdade com vários usuários em máquinas
     diferentes, precisa de um back-end real (Node.js, PHP,
     Firebase etc.) com banco de dados — o localStorage é só uma
     simulação local pra testar a interface agora.
   =========================================================== */

const CHAVE_ARMAZENAMENTO = "liepedia_artigos";

/* ---------- Acesso aos dados ---------- */

function obterArtigos() {
  const bruto = localStorage.getItem(CHAVE_ARMAZENAMENTO);
  if (!bruto) return [];
  try {
    return JSON.parse(bruto);
  } catch (e) {
    console.error("Não foi possível ler os artigos salvos:", e);
    return [];
  }
}

function salvarArtigos(artigos) {
  localStorage.setItem(CHAVE_ARMAZENAMENTO, JSON.stringify(artigos));
}

/**
 * Publica um novo artigo e atualiza a página na hora.
 * No futuro, chamem essa função a partir do formulário de
 * "Criar artigo" (depois que o usuário estiver logado).
 *
 * @param {Object} artigo
 * @param {string} artigo.titulo
 * @param {string} artigo.resumo
 * @param {string} [artigo.emoji] - emoji usado como imagem do card (enquanto não há upload de imagem)
 */
function publicarArtigo({ titulo, resumo, emoji = "📄" }) {
  if (!titulo || !resumo) {
    console.warn("Título e resumo são obrigatórios para publicar um artigo.");
    return;
  }

  const artigos = obterArtigos();
  artigos.push({
    titulo,
    resumo,
    emoji,
    dataPublicacao: new Date().toISOString(),
  });

  salvarArtigos(artigos);
  renderizarPagina();
}

/* ---------- Renderização ---------- */

function renderizarPagina() {
  const artigos = obterArtigos();
  renderizarArtigosDestaque(artigos);
}

function renderizarArtigosDestaque(artigos) {
  const grade = document.getElementById("grade-destaque");

  if (artigos.length === 0) {
    grade.innerHTML = `
      <div class="estado-vazio">
        Nenhum artigo foi publicado ainda.<br>
        Crie uma conta e seja o primeiro a espalhar uma mentira por aqui!
      </div>`;
    return;
  }

  // mostra os 4 artigos mais recentes
  const recentes = [...artigos].reverse().slice(0, 4);

  grade.innerHTML = recentes
    .map(
      (a) => `
      <article class="cartao-artigo">
        <div class="cartao-artigo__imagem">${escaparHtml(a.emoji || "📄")}</div>
        <div class="cartao-artigo__corpo">
          <h4><a href="#">${escaparHtml(a.titulo)}</a></h4>
          <p>${escaparHtml(a.resumo)}</p>
        </div>
      </article>`
    )
    .join("");
}

/* ---------- Busca (exemplo simples) ---------- */

function configurarBusca() {
  const campo = document.getElementById("campoBusca");
  const botao = document.getElementById("botaoBusca");

  function pesquisar() {
    const termo = campo.value.trim().toLowerCase();
    if (!termo) return;

    const artigos = obterArtigos();
    const encontrados = artigos.filter((a) =>
      a.titulo.toLowerCase().includes(termo)
    );

    if (encontrados.length === 0) {
      alert(`Nenhum artigo encontrado para "${termo}".`);
    } else {
      alert(
        `Encontrados ${encontrados.length} artigo(s):\n` +
          encontrados.map((a) => "- " + a.titulo).join("\n")
      );
    }
  }

  botao.addEventListener("click", pesquisar);
  campo.addEventListener("keydown", (e) => {
    if (e.key === "Enter") pesquisar();
  });
}

/* ---------- Utilitário: evitar HTML injection ---------- */

function escaparHtml(texto) {
  const div = document.createElement("div");
  div.textContent = texto;
  return div.innerHTML;
}

/* ---------- Menu mobile (abrir/fechar a barra lateral) ---------- */

function configurarMenuMobile() {
  const botaoMenu = document.getElementById("botaoMenu");
  const barraLateral = document.getElementById("barraLateral");
  const fundoMenu = document.getElementById("fundoMenu");

  function abrirMenu() {
    barraLateral.classList.add("aberta");
    fundoMenu.classList.add("visivel");
    botaoMenu.setAttribute("aria-expanded", "true");
  }

  function fecharMenu() {
    barraLateral.classList.remove("aberta");
    fundoMenu.classList.remove("visivel");
    botaoMenu.setAttribute("aria-expanded", "false");
  }

  botaoMenu.addEventListener("click", () => {
    const estaAberta = barraLateral.classList.contains("aberta");
    estaAberta ? fecharMenu() : abrirMenu();
  });

  // fecha ao clicar no fundo escurecido
  fundoMenu.addEventListener("click", fecharMenu);

  // fecha ao clicar em qualquer link do menu (comum no mobile)
  barraLateral.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", fecharMenu);
  });
}

/* ---------- Inicialização ---------- */

document.addEventListener("DOMContentLoaded", () => {
  renderizarPagina();
  configurarBusca();
  configurarMenuMobile();
});

/* Expõe as funções para você testar no console do navegador
   ou conectar depois ao formulário "Criar artigo". Exemplo, no
   console do navegador (F12 > Console):

   LiePedia.publicarArtigo({
     titulo: "A Lua é feita de queijo",
     resumo: "Cientistas insistem que é rocha, mas a verdadeira composição lunar é...",
     emoji: "🌕"
   });
*/
window.LiePedia = {
  publicarArtigo,
  listarArtigos: obterArtigos,
  limparArtigos: () => {
    localStorage.removeItem(CHAVE_ARMAZENAMENTO);
    renderizarPagina();
  },
};
