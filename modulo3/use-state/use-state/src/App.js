import { useState } from "react"
import { Header } from './components/Header'
import { Post } from './components/Post'
import { CurtidasComentarios } from './components/CurtidasComentarios'
import fotoDoUsuario from '../src/components/img/fotoDoUsuario.jpg'
import fotoDoPost from "./src/components/img/fotoDoPost"


function App() {

  return (

    <div>
      <Header
      fotoDoUsuario = {fotoDoUsuario}
      userName = "Sophia Mendonça"
      />
      <Post
      subtitle = "Sejam mundo bem-vindos ao Mundo Autista!"
      fotoDoPost = {fotoDoPost}
      />
      <CurtidasComentarios />
    </div>
  )
}

export default App
