// Usando o método MAP para elevar ao quadrado os números do meu array "gaveta".
let gaveta = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
let dobrar = gaveta.map(n => n ** 2)
console.log(dobrar);

// Aqui usei o método filter para Filtrar números que fosse igual ou maior que 18.
let idade = [15, 18, 22, 30, 16, 40]
let filtrar = idade.filter(n => n >= 18)
console.log(filtrar);

// Usando o método reduce para encontrar um valor total.
let precos = [10, 20, 30, 40]
let calculo = precos.reduce((acum, b) => acum + b, 0)
console.log(calculo);

//Reduce que calcula média e valor
let media = precos.reduce((acum, b) => acum + b, 0) / precos.length;
console.log(media); // 25
