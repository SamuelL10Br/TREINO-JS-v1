//O que é JSON?
//JSON = JavaScript Object Notation (Notação de Objetos JavaScript).
//É um formato de texto para representar dados.
//É usado em praticamente todas as APIs para enviar/receber informações.
//Exemplo de um JSON (um usuário):

{
  "id": 1,
  "nome": "Samuel",
  "idade": 25,
  "email": "samuel@example.com"
}

//1. Converter JSON em Objeto (parse)
// JSON (texto)
const jsonString = '{"id":1,"nome":"Samuel","idade":25,"email":"samuel@example.com"}';
// Converter para objeto JS
const usuario = JSON.parse(jsonString);
console.log(usuario.nome);  // Samuel
console.log(usuario.idade); // 25

//2. Converter Objeto em JSON (stringify)
// Objeto normal
const produto = { id: 10, nome: "Notebook", preco: 3500 };
// Converter para JSON (texto)
const jsonProduto = JSON.stringify(produto);
console.log(jsonProduto);
// {"id":10,"nome":"Notebook","preco":3500}

//3. JSON com Arrays
const jsonArray = `
[
  {"id":1,"nome":"Samuel"},
  {"id":2,"nome":"João"},
  {"id":3,"nome":"Maria"}
]
`;

const usuarios = JSON.parse(jsonArray);
usuarios.forEach(u => console.log(u.id, u.nome));

//4. Juntando com APIs
fetch("https://jsonplaceholder.typicode.com/users")
  .then(res => res.json()) // transforma JSON em objeto
  .then(dados => {
    console.log(dados[0].name); // mostra o nome do primeiro usuário
  });


//--------------------------------------------------------------------------//


//Exemplo prático: Lista de produtos em JSON
// JSON em formato de texto (imita algo que viria de uma API)
const jsonProdutos = `
[
  {"id": 1, "nome": "Notebook", "preco": 3500},
  {"id": 2, "nome": "Smartphone", "preco": 2000},
  {"id": 3, "nome": "Teclado Mecânico", "preco": 350}
]
`;

// 1. Converter JSON -> Objeto JS
const produtos = JSON.parse(jsonProdutos);

console.log("Lista de produtos (objeto JS):");
console.log(produtos);

// 2. Manipular os dados
produtos.forEach(p => {
  console.log(`O produto ${p.nome} custa R$${p.preco}`);
});

// 3. Criar um novo produto em objeto JS
const novoProduto = { id: 4, nome: "Monitor", preco: 1200 };

// Adicionar na lista
produtos.push(novoProduto);

// 4. Converter de volta para JSON
const jsonFinal = JSON.stringify(produtos);

console.log("\nJSON final (texto):");
console.log(jsonFinal);

1-O que acontece passo a passo

2-Temos um JSON em texto → jsonProdutos.

3-Converti em objeto com JSON.parse(jsonProdutos).

4-Usei .forEach() para imprimir frases sobre os produtos.

5-Criei um novo produto (objeto JS) e coloquei no array.

6-Transformei tudo de volta em JSON de texto com JSON.stringify().

//-------------------------------------------------------------------//

//Saída esperada no console//
Lista de produtos (objeto JS):
[
  { id: 1, nome: 'Notebook', preco: 3500 },
  { id: 2, nome: 'Smartphone', preco: 2000 },
  { id: 3, nome: 'Teclado Mecânico', preco: 350 }
]
O produto Notebook custa R$3500
O produto Smartphone custa R$2000
O produto Teclado Mecânico custa R$350

JSON final (texto):
[{"id":1,"nome":"Notebook","preco":3500},{"id":2,"nome":"Smartphone","preco":2000},{"id":3,"nome":"Teclado Mecânico","preco":350},{"id":4,"nome":"Monitor","preco":1200}]

//-------------------------------------------------------------------//

//Desafio: Alunos e notas//
[
  {"nome": "João", "nota": 7},
  {"nome": "Maria", "nota": 9},
  {"nome": "Pedro", "nota": 5},
  {"nome": "Ana", "nota": 8}
]

//Tarefa em json-alunos.js//

// 1) JSON de alunos (como texto, vindo da API)
const jsonAlunos = `
[
  {"nome": "João", "nota": 7},
  {"nome": "Maria", "nota": 9},
  {"nome": "Pedro", "nota": 5},
  {"nome": "Ana", "nota": 8}
]
`;

// 2) Converter para objeto JS
const alunos = JSON.parse(jsonAlunos);

// 3) Mostrar cada aluno
alunos.forEach(a => console.log(`${a.nome} tirou nota ${a.nota}`));

// 4) Calcular média das notas
const media = alunos.reduce((soma, a) => soma + a.nota, 0) / alunos.length;

console.log("\nMédia da turma:", media);

// 5) Criar novo aluno e adicionar
const novoAluno = { nome: "Samuel", nota: 10 };
alunos.push(novoAluno);

// 6) Converter de volta para JSON
const jsonFinal = JSON.stringify(alunos);

console.log("\nJSON final:");
console.log(jsonFinal);
