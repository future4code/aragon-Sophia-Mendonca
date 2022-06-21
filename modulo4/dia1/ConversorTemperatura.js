const converteCelsius = (temperatura, escala) => {
    if(escala === "F"){
        const temperaturaFahrenheit = (temperatura * 9/5) + 32
        return `${temperatura}º Celsius é equivalente a ${temperaturaFahrenheit}º Fahrenheit.`
    }else if(escala === "K"){
        const temperaturaKelvin = (temperatura + 273.15)
        return `${temperatura}º Celsius é equivalente a ${temperaturaKelvin}º Kelvin.`
    }else{
        return `Erro - Parâmetro inválido (${escala}.)`
    }
}

console.log(converteCelsius(30, "F"))
console.log(converteCelsius(30, "K"))