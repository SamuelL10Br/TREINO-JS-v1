const API = "https://jsonplaceholder.typicode.com/users";
const lista = document.getElementById("usuarios");
const form = document.getElementById("formUsuario");
const nomeInput = document.getElementById("nome");
const emailInput = document.getElementById("email");

//Read (listar usuários)
async function carregarUsuarios() {
    lista.innerHTML = "Carregando...";

    try {
        const resp = await fetch(API);
        const usuarios = await resp.json();

        lista.innerHTML = "";
        usuarios.slice(0, 5).forEach(u => { // mostra só 5 para não lotar
            renderUsuario(u);
        });
    } catch (e) {
        lista.innerHTML = "Erro ao carregar usuários";
    }
}

// Create (adicionar novo usuário)
form.addEventListener("submit", async (ev) => {
    ev.preventDefault();

    const novoUsuario = {
        name: nomeInput.value,
        email: emailInput.value
    };

    try {
        const resp = await fetch(API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novoUsuario)
        });

        const criado = await resp.json();
        renderUsuario(criado);

        nomeInput.value = "";
        emailInput.value = "";
    } catch (e) {
        alert("Erro ao criar usuário");
    }
});

// Update (editar usuário)
async function editarUsuario(id, nome, email) {
    try {
        const resp = await fetch(`${API}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: nome, email: email })
        });
        const atualizado = await resp.json();
        alert(`Usuário atualizado: ${atualizado.name}`);
    } catch (e) {
        alert("Erro ao atualizar usuário");
    }
}

// DELETE (remover usuário)
async function deletarUsuario(id, card) {
    try {
        const resp = await fetch(`${API}/${id}`, { method: "DELETE"});
        if (resp.ok) {
            card.remove();
        }
    } catch (e) {
        alert("Erro ao deletar usuário");
    }
}

// Renderizar card de usuário
function renderUsuario(u) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<strong>${u.name}</strong><br>${u.email}<br>
    <button class="editar">Editar</button>
    <button class="deletar">Deletar</button>`;

// Botão editar => edita direto para nome fixo
card.querySelector(".editar").addEventListener("click", () => {
    editarUsuario(u.id, u.name + " (editado)", u.email);
});

// Botão deletar
card.querySelector(".deletar").addEventListener("click", () => {
    deletarUsuario(u.id, card);
});

    lista.appendChild(card);
}

carregarUsuarios();
