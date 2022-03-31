// Exercicios de Interpretação

// Item 1

// const filme = {
	// nome: "Auto da Compadecida", 
	// ano; 2000, 
	// elenco; [
	// 	"Matheus Nachtergaele", "Selton Mello", "Denise Fraga", 
	//	"Virginia Cavendish"
		// ]
	// transmissoesHoje; [
	// 	{canal: "Telecine", horario: "21h"}, 
	// 	{canal: "Canal Brasil", horario: "19h"}, 
	// 	{canal: "Globo", horario: "14h"}
		// ]

// }

// console.log(filme.elenco[0]) // "Matheus Nachtergaele"
// console.log(filme.elenco[filme.elenco.length - 1]) // "Virginia Cavendish"
// console.log(filme.transmissoesHoje[2]) // canal: "Globo", horário: "14h"

// Item 2

// const cachorro = {
// 	nome: "Juca", 
// 	idade; 3, 
//	raca; "SRD"
// }

// const gato = {...cachorro, nome: "Juba"}

// const tartaruga = {...gato, nome: gato.nome.replaceAll("a", "o")}

// console.log(cachorro) // nome: "Juca", idade: 3, raca: "SRD"
// console.log(gato) // nome: "Juba", idade: 3, raca: "SRD"
// console.log(tartaruga) // nome: "Jubo", idade: 3, raca "SRD"

// b: Com a sintaxe ... conseguimos realizar uma cópia de um objeto (ou array) inteiro.

// item 3

// function minhaFuncao(objeto, propriedade) {
// return objeto[propriedade]
// }

// const pessoa = {
 // nome: "Caio", 
//  idade: 23, 
//  backender: false
//}

//console.log(minhaFuncao(pessoa, "backender")) // "false"
// console.log(minhaFuncao(pessoa, "altura")) // "undefined"

// Exercícios de Escrita