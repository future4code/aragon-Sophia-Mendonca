import React from "react";
import axios from "axios";


const axiosConfig = {
  headers: {
    Authorization: "sophia-mendonca-aragon"
  }
};

class lista extends React.Component {
  state = {
    playlists: [],
    TelaAtual: "playlists",
    playlistsId: "",
  };

  componentDidMount() {
    this.buscarPlaylists();
  }

  buscarPlaylists = () => {
    axios
      .get(
        "https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/search?name=string",
        axiosConfig
      )
      .then(response => {
        this.setState({ playlists: response.data });
      });
  };

  handlePlaylistsDeletion = PlaylistsId => {
    if (window.confirm("Tem certeza que deseja deletar a playlist?")) {
      axios
        .delete(
          `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/:playlistId}`,
          axiosConfig
        )
        .then(() => {
          this.buscarPlaylists();
        })
        .catch(e => {
          alert("Tem certeza que deseja deletar essa playlist");
        });
    }
  };

  changePage = PlaylistsId => {
    if (this.state.currentPage === "playlist") {
      this.setState({ currentPage: "PlaylistDetails", userId: PlaylistsId });
    } else {
      this.setState({ currentPage: "playlist", playlistsId: "" });
    }
  };

  handlePlaylistChange = event => {
    const newPlaylistValue = event.target.value;

    this.setState({ name: newPlaylistValue });
  };

  handleSearchPlaylist = () => {
    axios
      .get(
        `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${this.state.playlists}`,
        axiosConfig
      )
      .then(response => {
        this.setState({ playlists: response.data });
      })
      .catch(error => {
        alert("Erro ao criar o usuário");
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        {this.state.TelaAtual === "playlists" ? (
          <div>
            <ul>
              {this.state.playlists.length === 0 && <div>Carregando...</div>}
              {this.state.playlists.map(playlists => {
                return (
                  <li>
                    <span onClick={() => this.changePage(playlists.id)}>
                      {playlists.name}
                    </span>
                    <DeleteButton
                      onClick={() => this.handlePlaylistsDeletion(playlists.id)}
                    >
                      X
                    </DeleteButton >
                  </li>
                );
              })}
            </ul>
            <hr />
            <h4>Encontrar Playlist</h4>
            <input
              placeholder="Nome para busca"
              type="text"
                 value={this.state.name}
                 onChange={this.handlePlaylistsChange}
            />
            <button onClick={this.handleSearchPlaylists}>Salvar</button>
          </div>
        ) (
          <PlaylistsDetails PlaylistsId={this.state.playlistsId} changePage={this.changePage} />
        )}
      </div>

    )
  }
}

export default lista;