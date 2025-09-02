let numeros = [1, 2, 3, 4, 5];
// forEach (só percorre)
numeros.forEach(n => console.log(n));

// map(cria novo array dobrando valores)
let dobrados = numeros.map(n => n * 2);
console.log(dobrados);

// filter (filtra pares)
let pares = numeros.filter(n => n % 2 === 0);
console.log(pares);

// reduce (soma tudo)
let soma = numeros.reduce((acum, n) => acum + n, 0);
console.log(soma);