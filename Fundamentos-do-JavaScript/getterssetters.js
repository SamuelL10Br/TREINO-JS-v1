//Etapa 1 — O que é uma classe em JS?

//Uma classe é uma forma de organizar código.
//Ela é como uma “fábrica de objetos” com atributos (dados) e métodos (ações).

//Exemplo básico:

class Pessoa {
  constructor(nome, idade) {
    this.nome = nome;
    this.idade = idade;
  }

  falar() {
    console.log(`Oi, eu sou ${this.nome} e tenho ${this.idade} anos.`);
  }
}

const p1 = new Pessoa("Samuel", 25);
p1.falar(); // Oi, eu sou Samuel e tenho 25 anos.


//Etapa 2 — Getters e Setters

//Getter: é como uma “porta” para pegar um valor.

//Setter: é como uma “porta” para alterar um valor, com regras.

class Produto {
  constructor(nome, preco) {
    this._nome = nome;
    this._preco = preco;
  }

  // Getter
  get preco() {
    return this._preco;
  }

  // Setter
  set preco(valor) {
    if (valor < 0) {
      console.log("Preço inválido!");
    } else {
      this._preco = valor;
    }
  }
}

const p = new Produto("Notebook", 3000);

console.log(p.preco); // usa getter -> 3000

p.preco = -50; // usa setter -> "Preço inválido!"
p.preco = 3500; // setter aceita
console.log(p.preco); // 3500


//Etapa 3 — Encapsulamento com campos privados

//Campos privados são variáveis escondidas dentro da classe (não podem ser acessadas de fora).
//No JS moderno usamos #:

class Usuario {
  #senha; // campo privado

  constructor(nome, senha) {
    this.nome = nome;
    this.#senha = senha;
  }

  get senha() {
    return "********"; // nunca mostra a senha real
  }

  set senha(nova) {
    if (nova.length < 6) {
      throw new Error("Senha muito curta!");
    }
    this.#senha = nova;
  }
}

const u = new Usuario("Samuel", "123456");
console.log(u.senha); // ********
u.senha = "abc"; // ERRO: Senha muito curta!

