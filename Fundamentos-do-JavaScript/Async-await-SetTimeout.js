// Operação síncrona
console.log("Início");
console.log("Meio");
console.log("Fim")

// Operação assíncrona
console.log("Início");

setTimeout(() => {
    console.log("Demorou 2 segundos");
}, 2000);

console.log("Fim");

//Uso de promesas
let promessa = new Promise((resolve, reject) => {
    let sucesso = true;

    if(sucesso) {
        resolve("Deu certo!");
    } else {
        reject("Deu errado!");
    }
});
promessa
.then(resultado => console.log(resultado))
.catch(erro => console.error(erro));

//Com async/await que é um jeito mais simples de trabalhar com promises
function esperar(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function executar() {
    console.log("Início");
    await esperar(2000); // espera 2 segundos
    console.log("Depois de 2 segundos");
    console.log("Fim");
}

executar();
