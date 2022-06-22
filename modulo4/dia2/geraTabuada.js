function geraTabuada(numero){

    if( typeof(numero) === "number" ){

        if(numero <= 10 && numero >= 1){

            let tabuada = [
                `${num} x 0 = ${num * 0}`,
                `${num} x 1 = ${num * 1}`,
                `${num} x 2 = ${num * 2}`,
                `${num} x 3 = ${num * 3}`,
                `${num} x 4 = ${num * 4}`,
                `${num} x 5 = ${num * 5}`,
                `${num} x 6 = ${num * 6}`,
                `${num} x 7 = ${num * 7}`,
                `${num} x 8 = ${num * 8}`,
                `${num} x 9 = ${num * 9}`,
                `${num} x 10 = ${num * 10}`
            ]
            return tabuada

        }else{
            return 'Erro. Parâmetro inválido: O número deve ser entre 1 e 10.'
        }
    }else{
        return 'Erro. Parâmetro inválido: deve ser um número.'
    }
}

console.log(geraTabuada(6))
console.log(geraTabuada("10"))
console.log(geraTabuada(50))