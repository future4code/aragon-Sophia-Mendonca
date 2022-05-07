import React from "react"
import MusicasPage from "./pages/MusicasPage/Musicas";
import PlaylistsPage from "./pages/PlaylistsPage/Playlists";

export default class App extends React.Component {
state = {
  telaAtual: "playlists"
}

selectPage = () => {
  switch (this.state.telaAtual) {
    case "playlists":
      return <PlaylistsPage />
    case "musicas":
      return <MusicasPage />
    default:
      return <PlaylistsPage />
  }
}

  render(){
    return (
      <div>
        {this.selectPage()}
      </div>
    );
  }
}