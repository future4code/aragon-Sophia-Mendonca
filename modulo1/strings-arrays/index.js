// Exercícios de interpretação de código

// Exercício 1

let array
console.log('a. ', array) // (a. undefined) 

array = null
console.log('b. ', array) // (a. undefined))

array = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] // (contar quantos elementos aparece na array)
console.log('c. ', array.length)

let i = 0
console.log('d. ', array[i])

array[i+1] = 19
console.log('e. ', array)

const valor = array[i+6]
console.log('f. ', valor)

// fiz o que dei conta

// Exercício 2

const frase = prompt("Subi num ônibus em Marrocos")
console.log(frase.toUpperCase().replaceAll("A", "I"), frase.length) // SUBI NUM ÔNIBUS EM MIRROCOS

// Exercícios de escrita de código

// Exercício 1

let nomeUsuario = prompt("Digite o nome do usuário");
let emailUsuario = prompt("Digite o email do usuário");
console.log("O email " + emailUsuario + " foi cadastrado com sucesso. Seja bem-vinda, " + nomeUsuario + "!")

// Exercíco 2

let comidasFavoritas = ["comida japonesa", "brigadeiro", "pipoca", "pizza", "sorvete"]
console.log("Essas são as minhas comidas preferidas" + comidasFavoritas)

let perguntarComida = prompt("Digite a sua comida preferida")
let adicionarComida = comidasFavoritas.push (perguntarComida)
console.log ("Essas são as minhas comidas preferidas + comidasFavoritas")

// não foi implementado o imprimir encima do outro

// Exercício 3

// não consegui fazer esse