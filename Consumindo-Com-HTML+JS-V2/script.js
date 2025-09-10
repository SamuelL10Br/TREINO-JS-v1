const API = "https://jsonplaceholder.typicode.com";

const elStatus = document.getElementById("status");
const elLista  = document.getElementById("posts");
const elBusca  = document.getElementById("busca");
const elDet    = document.getElementById("post-detalhe");
const elCom    = document.getElementById("comentarios");
const elForm   = document.getElementById("form-novo");
const elTitulo = document.getElementById("titulo");
const elConte  = document.getElementById("conteudo");
const elStatusPost = document.getElementById("status-post");

let postsOriginais = [];    // guarda todos os posts carregados
let postsFiltrados = [];    // resultado do filtro

// Util: cria um elemento com classes e HTML
function h(tag, className, html) {
  const e = document.createElement(tag);
  if (className) e.className = className;
  if (html) e.innerHTML = html;
  return e;
}

async function carregarPosts() {
  try {
    elStatus.textContent = "Carregando posts…";
    elLista.classList.add("loading");

    const resp = await fetch(`${API}/posts`);
    if (!resp.ok) throw new Error(`Falha: ${resp.status} ${resp.statusText}`);

    postsOriginais = await resp.json();
    postsFiltrados = postsOriginais; // inicia sem filtro
    renderLista(postsFiltrados);

    elStatus.textContent = `Total: ${postsFiltrados.length} posts`;
  } catch (e) {
    elStatus.textContent = `Erro ao carregar: ${e.message}`;
    elStatus.classList.add("erro");
  } finally {
    elLista.classList.remove("loading");
  }
}

function renderLista(lista) {
  elLista.innerHTML = "";
  if (!lista.length) {
    elLista.appendChild(h("div", "muted", "Nenhum resultado."));
    return;
  }
  // Mostra 30 para não ficar gigante (ajuste como quiser)
  lista.slice(0, 30).forEach(p => {
    const card = h("div", "card");
    const titulo = h("div", null, `<strong>#${p.id} — ${p.title}</strong>`);
    const abrir = h("div", "link", "Ver detalhes e comentários");
    abrir.addEventListener("click", () => abrirDetalhe(p));

    card.appendChild(titulo);
    card.appendChild(abrir);
    elLista.appendChild(card);
  });
}

function aplicarFiltro() {
  const termo = elBusca.value.toLowerCase().trim();
  if (!termo) {
    postsFiltrados = postsOriginais;
  } else {
    postsFiltrados = postsOriginais.filter(p =>
      p.title.toLowerCase().includes(termo)
    );
  }
  renderLista(postsFiltrados);
  elStatus.textContent = `Total: ${postsFiltrados.length} posts`;
}

async function abrirDetalhe(post) {
  // mostra corpo do post
  elDet.innerHTML = `
    <div class="card">
      <h4>#${post.id} — ${post.title}</h4>
      <p>${post.body}</p>
    </div>
  `;

  // busca comentários
  elCom.innerHTML = `<div class="muted">Carregando comentários…</div>`;
  try {
    const resp = await fetch(`${API}/posts/${post.id}/comments`);
    if (!resp.ok) throw new Error(`Falha: ${resp.status}`);
    const comentarios = await resp.json();

    // render
    if (!comentarios.length) {
      elCom.innerHTML = `<div class="muted">Sem comentários.</div>`;
      return;
    }
    elCom.innerHTML = "";
    comentarios.forEach(c => {
      const item = h("div", "card",
        `<strong>${c.name}</strong><br/>
         <span class="muted">${c.email}</span>
         <p>${c.body}</p>`
      );
      elCom.appendChild(item);
    });
  } catch (e) {
    elCom.innerHTML = `<div class="erro">Erro ao carregar comentários: ${e.message}</div>`;
  }
}

// POST: criar um novo post (fake no JSONPlaceholder)
elForm.addEventListener("submit", async (ev) => {
  ev.preventDefault();
  elStatusPost.textContent = "Enviando…";

  const payload = {
    title: elTitulo.value,
    body: elConte.value,
    userId: 1
  };

  try {
    const resp = await fetch(`${API}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify(payload)
    });
    if (!resp.ok) throw new Error(`Falha: ${resp.status}`);
    const criado = await resp.json();

    elStatusPost.textContent = `Criado com id: ${criado.id}`;
    // opcional: coloca o novo post no topo da lista local
    postsOriginais.unshift(criado);
    aplicarFiltro(); // re-renderiza com possível filtro
    elTitulo.value = "";
    elConte.value = "";
  } catch (e) {
    elStatusPost.textContent = `Erro ao criar: ${e.message}`;
    elStatusPost.classList.add("erro");
  }
});

// eventos
elBusca.addEventListener("input", aplicarFiltro);

// inicialização
carregarPosts();
