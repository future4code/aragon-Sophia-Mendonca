import React from "react"
import MusicasPage from "./pages/MusicasPage/Musicas";
import PlaylistsPage from "./pages/PlaylistsPage/Playlists";
import PlaylistsDetails from "./PlaylistsDetails.js/PlaylistsDetails";

export default class App extends React.Component {
state = {
  telaAtual: "playlists"
}

selectPage = () => {
  switch (this.state.telaAtual) {
    case "playlists":
      return <PlaylistsPage />
   case "details":
        return <PlaylistsDetails />
   case "lista":
        return <lista />
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