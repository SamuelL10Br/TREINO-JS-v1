let carros = ["fiat", "chevrolet", "ford"];
console.log(carros[1]);

let aluno = {
    nome: "João",
    idade: 38,
    cidade: "Pernambuco"
};
console.log(aluno.nome, aluno["idade"], aluno.cidade);

function mostrarPessoa(pessoa) {
    console.log(`Nome: ${pessoa.nome}, idade: ${pessoa.idade}`);
}

let pessoa = { nome: "João", idade: 38 };
mostrarPessoa(pessoa);
