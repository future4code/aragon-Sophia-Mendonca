// Exercícios de interpretação de código

// //item 1

// const respostaDoUsuario = prompt("Digite o número que você quer testar")
// const numero = Number(respostaDoUsuario)

// if (numero % 2 === 0) {
//   console.log("Passou no teste.")
// } else {
//   console.log("Não passou no teste.")
// }

// a) Para passar no teste, o valor da condição 1 (if) deve ser verdadeiro. Ou seja, se o valor e o tipo do número divididos por 2 forem igual a 0.
// b) Ele imprime passou no teste para números cujo valor seja verdadeiro.
// c) Ele imprime não passou no teste para números cujo valor seja falso.

// item2

// let fruta = prompt("Escolha uma fruta")
// let preco
// switch (fruta) {
//   case "Laranja":
//     preco = 3.5
//     break;
//   case "Maçã":
//     preco = 2.25
//     break;
//   case "Uva":
//     preco = 0.30
//     break;
//   case "Pêra":
//     preco = 5.5
//     break; // BREAK PARA O ITEM c.
//   default:
//     preco = 5
//     break;
// }
// console.log("O preço da fruta ", fruta, " é ", "R$ ", preco)

// a) O código serve para mostrar qual é o preço da fruta escolhida.
// b) Se o valor da fruta for "maçã", o console imprimirá (O preço da fruta maçã é R$ 2.25)
// c) Se retirássemos o break, retornaria a mensagem "false".

// item 3

// const numero = Number(prompt("Digite o primeiro número."))

// if(numero > 0) {
//   console.log("Esse número passou no teste")
// 	let mensagem = "Essa mensagem é secreta!!!"
// }

// console.log(mensagem)

// a) a primeira linha solicita ao usuário que digite o primeiro número.
// b) Se for 10, a mensagem será "Essa mensagem é secreta!!!". Se for -10, aparece "Esse número passou no teste".
// c) Sim, pois o bloco if imprime true, e não false, como o bloco else.





