//Se algo é x faça assim, senão faça y;
let idade = 22;

if(idade >= 22){
    console.log(`É maior de idade`);
} else {
    console.group(`Não é de maior`);
}

//Usado para uma contade de 1 até 5;
for (let i = 1; i <= 5; i++){
    console.log("Número: " + i);
}

//Um tipo de contagem, mas aqui vamos colocar uma quantidade
//Pois pode acabar sendo infinito.

let contador = 0;
while (contador < 3){
    console.log("Contagem: " + contador);
    contador++;
}

//Função regular

function saudacao(nome) {
    return "Olá, " + nome + "!";
}
console.log(saudacao("Samuel"));

//Função arrow

const somar = (a, b) => a + b;
console.log(somar(5, 3));
