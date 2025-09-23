async function criarPost() {
    try {
        const novoPost = {
            title: "Meu primeiro post",
            body: "Estou aprendendo a usar POST em APIS!",
            userId: 1
        };

        const resp = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=UTF-8" },
            body: JSON.stringify(novoPost)
        });

        if(!resp.ok) {
            throw new Error(`Falha HTTP: ${resp.status} ${resp.statusText}`);
        }

        const data = await resp.json();
        console.log("Post criado:", data);
    } catch (e) {
        console.log("Erro:", e);
    }
}

criarPost();