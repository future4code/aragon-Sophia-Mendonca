/**
 * EXEMPLO DE UTILIZAÇÃO DA 'comprarCarta'
 * 
 * 
    const carta = comprarCarta(); // Sorteia uma carta. Por exemplo, o rei de ouros
    
    console.log(carta.texto) // imprime o texto da carta. Exemplo: "K♦️" (indica "K" de ouros)
    console.log(carta.valor) // imprime o valor da carta (um número). Exemplo: 10 (dado que "K" vale 10)
 * 
 * 
 * 
 */

       // Projeto
       console.log("Seja bem-vinda(o) ao jogo de Black Jack!");

       if (confirm("Você deseja iniciar o jogo, sim ou não?")) {
          iniciaJogo();
       }
       
       else {
          console.log("Jogo finalizado, obrigada/o por jogar. Até mais!");
       }
       
       function iniciaJogo() {
       
          let cartas = comprarCarta();
       
          for (let j = 0; j <= 12; j++) {
       
             for (let k = 0; k <= 3; k++) {
       
                const cartas = [
                   { valor: "A" },
                   { valor: 2 },
                   { valor: 3 },
                   { valor: 4 },
                   { valor: 5 },
                   { valor: 6 },
                   { valor: 7 },
                   { valor: 8 },
                   { valor: 9 },
                   { valor: 10 },
                   { valor: "J" },
                   { valor: "Q" },
                   { valor: "K" }
                ]
       
                const naipes = [
                   { nome: "copas" },
                   { nome: "espadas" },
                   { nome: "ouros" },
                   { nome: "paus" }
                ]
       
                console.log(cartas[j], [k]);
       
             }
          }
       }