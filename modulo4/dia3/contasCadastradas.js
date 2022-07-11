const contas = [
	{
		email: "astrodev@labenu.com",
		password: "abc123"
	},
	{
		email: "bananinha@gmail.com",
		password: "bananinha"
	}
]

const login = (email, password) => {
    if (email.includes("@") && password.length>=6){
        for (let i=0; i <=contas.length; i++){
            const validaEmail = contas[i].email === email
            const validaPassword = contas[i].password === password
            const autoriza = validaEmail && validaPassword

            if (autoriza){
                return "login bem sucedido"
            } else {
                return 'email ou senha incorretos'
            }
        }
    } else{
        return 'email inválido ou senha com menos de 6 caracteres'
    }                                                         
}

console.log(login("astrodev@labenu.com", "abc123"))
console.log(login("bananinha@gmail.com", "banana"))
console.log(login("astrodev.labenu.com", "abc123"))
console.log(login("bananinha@gmail.com", "banan")) 