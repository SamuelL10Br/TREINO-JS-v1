async function atualizarPost() {
    try {
        const atualizacao = {
            title: "Post atualizado",
            body: "Editei este post com sucesso!",
            userId: 1
        };

        const resp = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
            method: "PUT",
            headers: { "Content-Type": "application/json; charset=UTF-8" },
            body: JSON.stringify(atualizacao)
        });

        if(!resp.ok) {
            throw new Error(`Falha HTTP: ${resp.status} ${resp.statusText}`);
        }

        const data = await resp.json();
        console.log("Post atualizado:", data);
    } catch (e) {
        console.log("Erro:", e);
    }
}

atualizarPost();