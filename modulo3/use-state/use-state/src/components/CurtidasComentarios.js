import { useState } from "react"

export function CurtidasComentarios(props) {
    const [Curtidas, setCurtidas] = useState(false)
    const [Comentado, setComentado] = useState(false)
    const [numeroDeComentarios, setNumeroDeComentarios] = useState(0)
    const [inputValue, setInputValue] = useState("")

    const mudarCurtidas = () => {
        setCurtidas (!Curtidas)
    }
    const mudarNumeroDeCurtidas= () => {
        if (Curtidas === true) {
            return 1
        } else {
            return 0
        }
    }

    const adicionarComentarios = () => {
        setComentado(!Comentado)
    }
    const onChangeComentarios = (event) => {
        setInputValue(event.target.value)
    }
    const enviarComentarios = (Comentarios) => {
        const listaDeComentarios = [...Comentado, Comentarios]
        setComentado (listaDeComentarios)
        setComentado(false)
        setNumeroDeComentarios (numeroDeComentarios + 1)
        setInputValue("")
    }

    const boxComentarios = Comentado ? (
        <section>
            <input
                placeholder="Digite o seu comentário"
                value={inputValue}
                onChange={onChangeComentarios}
            />
            <button onClick={() => { enviarComentarios(inputValue) }}>
                Enviar
            </button>
        </section>
    )
    
:
    Comentado.map((comentario, index) => {
        return (
            <div key={index}>
                <p>{comentario}</p>
            </div>
        )
    })

    return (
        <curtidasEComentarios>
            <section>
                <p>Curtidas: {mudarNumeroDeCurtidas()}</p>
                <button onClick={() => mudarCurtidas()}>{Curtidas === false ? "Curtidas" : "Descurtir"}</button>
            </section>
                <div >
                    <p>Comentários: {numeroDeComentarios}</p>
                    <button onClick={adicionarComentarios}>{Comentado === false ? "Adicionar comentário" :"Fechar Comentário"}</button>
                </div>
                {boxComentarios}
        </curtidasEComentarios>
    )
} 