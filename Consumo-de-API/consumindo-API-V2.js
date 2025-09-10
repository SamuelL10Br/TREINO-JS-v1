fetch("https://jsonplaceholder.typicode.com/users")
.then(res => res.json())
.then(dados => {
    dados.forEach(user => {
        console.log(`Nome: ${user.name} - Email: ${user.email}`);        
    });
})
.catch(erro => console.log("Erro:", erro));