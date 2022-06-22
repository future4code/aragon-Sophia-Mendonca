const clientes = [
[
	{ id: 1, nome: "Fulano" },
	{ id: 2, nome: "Ciclano" },
	{ id: 3, nome: "Beltrano" },
	{ id: 4, nome: "Fulana" }
]
]; 

function adicionarCliente(cliente){

    let index = cliente.findIndex(objeto => objeto.id === cliente.id);
        if(index < 0){
            clientes.push(cliente)
        } else {
            return console.log(`Erro. Parâmetro inválido: id ${cliente.id} já existe.`)
        }
    
    adicionarCliente({id: 5, nome: "Sophia"},)
    adicionarCliente({id: 1, nome: "Sophia"},)

    console.log(clientes)
    console.log(adicionarCliente({id: 1, nome: "Sophia"}))
}