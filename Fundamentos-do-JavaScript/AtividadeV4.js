console.log("Carregando...")
setTimeout(() => {
    console.log("Pronto!")
},3000);

let pedidos = new Promise((resolve, reject) => {
    let pronto = true;
    if(pronto){
        resolve("Seu pedido chegou!");
    } else {
        reject("Ocorreu um atraso");
    }
});
pedidos
.then(resultado => console.log(resultado))
.catch(erro => console.log(erro));

function esperarSegundos(ms) {
    return new Promise(resolve => setTimeout(resolve,ms));
}

async function segundos() {
    console.log("Contando o tempo x segundos...");
    await esperarSegundos(3000);
    console.log("Passaram 3 segundos!");
    console.log("Fim");
}
segundos();
