fetch("https://jsonplaceholder.typicode.com/users")
.then(resposta => resposta.json()) // converte para JSON
.then(dados => console.log(dados)) // mostra os dados
.catch(erro => console.log("Erro:", erro));