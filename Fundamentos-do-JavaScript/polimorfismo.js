//O que é polimorfismo?

//É quando diferentes objetos respondem de maneira diferente ao mesmo método.
//Isso evita if/else gigantes e deixa o código mais organizado.

class Animal {
  falar() {
    console.log("O animal faz um som...");
  }
}

class Cachorro extends Animal {
  falar() {
    console.log("Au au!");
  }
}

class Gato extends Animal {
  falar() {
    console.log("Miau!");
  }
}

const animais = [new Animal(), new Cachorro(), new Gato()];

animais.forEach(a => a.falar());


//Exemplo 2 - Formas geométricas

class Forma {
  area() {
    return 0;
  }
}

class Quadrado extends Forma {
  constructor(lado) {
    super();
    this.lado = lado;
  }
  area() {
    return this.lado * this.lado;
  }
}

class Circulo extends Forma {
  constructor(raio) {
    super();
    this.raio = raio;
  }
  area() {
    return Math.PI * this.raio * this.raio;
  }
}

const formas = [new Quadrado(4), new Circulo(3)];

formas.forEach(f => console.log(f.area()));
