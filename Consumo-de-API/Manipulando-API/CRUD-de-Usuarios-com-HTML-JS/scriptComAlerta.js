// ======= Config =======
const API = "https://jsonplaceholder.typicode.com/users";

// ======= Elements =======
const lista = document.getElementById("usuarios");
const form = document.getElementById("formUsuario");
const nomeInput = document.getElementById("nome");
const emailInput = document.getElementById("email");
const statusEl = document.getElementById("status");
const buscaInput = document.getElementById("busca");

// ======= State =======
let usuariosOriginais = []; // cache da API (para filtrar/buscar)
let usuariosVisiveis = [];  // o que está na tela

// ======= Utils =======
const isEmail = (v) => /\S+@\S+\.\S+/.test(v);
function setStatus(msg, isError = false) {
  statusEl.textContent = msg;
  statusEl.classList.toggle("erro", !!isError);
}

// Render genérico de lista
function renderLista(listaUsuarios) {
  lista.innerHTML = "";
  if (!listaUsuarios.length) {
    lista.innerHTML = "<div class='muted'>Nenhum usuário encontrado.</div>";
    return;
  }
  const frag = document.createDocumentFragment();
  listaUsuarios.forEach((u) => frag.appendChild(criarCardUsuario(u)));
  lista.appendChild(frag);
}

// ======= READ =======
async function carregarUsuarios() {
  setStatus("Carregando usuários…");
  lista.innerHTML = "";
  try {
    const resp = await fetch(API);
    if (!resp.ok) throw new Error(`Falha HTTP: ${resp.status}`);
    usuariosOriginais = await resp.json();

    // Mostra só 8 para não poluir a tela
    usuariosVisiveis = usuariosOriginais.slice(0, 8);
    renderLista(usuariosVisiveis);
    setStatus(`Total exibido: ${usuariosVisiveis.length} (de ${usuariosOriginais.length})`);
  } catch (e) {
    setStatus(`Erro ao carregar: ${e.message}`, true);
  }
}

// ======= CREATE =======
form.addEventListener("submit", async (ev) => {
  ev.preventDefault();

  const nome = nomeInput.value.trim();
  const email = emailInput.value.trim();

  if (!nome) return alert("Informe o nome.");
  if (!isEmail(email)) return alert("Email inválido.");

  const novoUsuario = { name: nome, email };

  try {
    const resp = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify(novoUsuario),
    });
    if (!resp.ok) throw new Error(`Falha HTTP: ${resp.status}`);
    const criado = await resp.json();

    // Atualização otimista: insere no topo
    usuariosVisiveis.unshift({ ...criado, id: criado.id ?? Date.now() });
    renderLista(usuariosVisiveis);
    form.reset();
    setStatus("Usuário criado (simulado) ✔");
  } catch (e) {
    alert("Erro ao criar usuário: " + e.message);
  }
});

// ======= UPDATE =======
async function editarUsuario(id, nome, email) {
  const payload = { name: nome, email };
  try {
    const resp = await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify(payload),
    });
    if (!resp.ok) throw new Error(`Falha HTTP: ${resp.status}`);
    const atualizado = await resp.json();

    // Atualiza no estado local
    usuariosVisiveis = usuariosVisiveis.map((u) =>
      u.id === id ? { ...u, ...atualizado } : u
    );
    renderLista(usuariosVisiveis);
    setStatus(`Usuário #${id} atualizado ✔`);
  } catch (e) {
    alert("Erro ao atualizar: " + e.message);
  }
}

// ======= DELETE =======
async function deletarUsuario(id) {
  const ok = confirm(`Tem certeza que deseja deletar o usuário #${id}?`);
  if (!ok) return;

  try {
    const resp = await fetch(`${API}/${id}`, { method: "DELETE" });
    if (!resp.ok) throw new Error(`Falha HTTP: ${resp.status}`);

    usuariosVisiveis = usuariosVisiveis.filter((u) => u.id !== id);
    renderLista(usuariosVisiveis);
    setStatus(`Usuário #${id} deletado (simulado) ✔`);
  } catch (e) {
    alert("Erro ao deletar: " + e.message);
  }
}

// ======= Busca (debounce) =======
let timer;
buscaInput.addEventListener("input", () => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    const termo = buscaInput.value.toLowerCase().trim();
    if (!termo) {
      usuariosVisiveis = usuariosOriginais.slice(0, 8);
    } else {
      usuariosVisiveis = usuariosOriginais.filter((u) =>
        (u.name ?? "").toLowerCase().includes(termo)
      );
    }
    renderLista(usuariosVisiveis);
    setStatus(`Exibindo: ${usuariosVisiveis.length} resultado(s)`);
  }, 250);
});

// ======= Card de Usuário (com edição inline) =======
function criarCardUsuario(u) {
  const card = document.createElement("div");
  card.className = "card";

  const nomeEl = document.createElement("div");
  nomeEl.innerHTML = `<strong>${u.name ?? "(sem nome)"}</strong>`;

  const emailEl = document.createElement("div");
  emailEl.textContent = u.email ?? "(sem email)";

  const botoes = document.createElement("div");
  botoes.className = "row";

  const btnEditar = document.createElement("button");
  btnEditar.textContent = "Editar";

  const btnDeletar = document.createElement("button");
  btnDeletar.textContent = "Deletar";

  botoes.append(btnEditar, btnDeletar);

  // Inputs para modo edição
  const inputNome = document.createElement("input");
  inputNome.type = "text";
  inputNome.value = u.name ?? "";

  const inputEmail = document.createElement("input");
  inputEmail.type = "email";
  inputEmail.value = u.email ?? "";

  const botoesEdicao = document.createElement("div");
  botoesEdicao.className = "row";

  const btnSalvar = document.createElement("button");
  btnSalvar.textContent = "Salvar";

  const btnCancelar = document.createElement("button");
  btnCancelar.textContent = "Cancelar";

  botoesEdicao.append(btnSalvar, btnCancelar);

  function renderModoLeitura() {
    card.innerHTML = "";
    card.append(nomeEl, emailEl, botoes);
  }

  function renderModoEdicao() {
    card.innerHTML = "";
    const lblNome = document.createElement("div");
    lblNome.className = "muted";
    lblNome.textContent = "Nome";
    const lblEmail = document.createElement("div");
    lblEmail.className = "muted";
    lblEmail.textContent = "Email";
    card.append(lblNome, inputNome, lblEmail, inputEmail, botoesEdicao);
  }

  // Ações
  btnEditar.addEventListener("click", () => {
    renderModoEdicao();
  });

  btnCancelar.addEventListener("click", () => {
    // restaura valores originais e volta pro modo leitura
    inputNome.value = u.name ?? "";
    inputEmail.value = u.email ?? "";
    renderModoLeitura();
  });

  btnSalvar.addEventListener("click", () => {
    const novoNome = inputNome.value.trim();
    const novoEmail = inputEmail.value.trim();
    if (!novoNome) return alert("Nome obrigatório");
    if (!isEmail(novoEmail)) return alert("Email inválido");

    // otimista: atualiza visual rapidamente
    u.name = novoNome;
    u.email = novoEmail;
    nomeEl.innerHTML = `<strong>${novoNome}</strong>`;
    emailEl.textContent = novoEmail;

    renderModoLeitura();
    editarUsuario(u.id, novoNome, novoEmail);
  });

  btnDeletar.addEventListener("click", () => deletarUsuario(u.id));

  // Estado inicial
  renderModoLeitura();
  return card;
}

// ======= Init =======
carregarUsuarios();
