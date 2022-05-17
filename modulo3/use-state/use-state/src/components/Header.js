export function Header(props) {

    return (
      <header>
        <h1 className="titulo">Post</h1>
        <section className="user">
          <img className="fotoUsuario" src={props.fotoDoUsuario} alt="Selma & Sophia, youtubers do canal Mundo Autista" />
          <p>{props.nomeDoUsuario}</p>  
        </section>      
      </header>
    )
  } 