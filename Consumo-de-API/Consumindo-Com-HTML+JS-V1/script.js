async function carregarUsuarios() {
    const status = document.getElementById("status");
    const lista = document.getElementById("usuarios");

    try {
        // 1) faz a requisição
        const resp = await fetch("https://jsonplaceholder.typicode.com/users");

        // 2) checa se a resposta veio OK (200-299)
        if(!resp.ok) {
            throw new Error(`Falha na requisição: ${resp.status} ${resp.statusText}`);
        }
        // 3) converte para objeto JS
        const usuarios = await resp.json();

        // 4) limpa o status e preenche a UL com <li>
        status.textContent = `Total: ${usuarios.length} usuários`;
        lista.innerHTML = ""; // garante vazio

        usuarios.forEach(u => {
            const li = document.createElement("li");
            li.textContent = `Nome: ${u.name} - Email: ${u.email} - Cidade: ${u.addres?.city}`;
            lista.appendChild(li);
        });
    } catch (erro) {
        // 5) trata erro (ex.: sem internet)
        status.textContent = `Erro ao carregar: ${erro.message}`;
        status.appendChild(li);
    }
}

// 5) dispara quando o script carregar
carregarUsuarios();