import React from "react";
import axios from "axios";
import PlaylistsDetails from "./PlaylistsDetails"

const axiosConfig = {
  headers: {
    Authorization: "sophia-mendonca-aragon"
  }
};

class playlistsDetails extends React.Component {
  state = {
    playlistsDetails: {},
    playlistsEdition: "editButton",
    name: "",
  };

  componentDidMount() {
    this.getPlaylistsDetails ();
  }

  getPlaylistsDetails = () => {
    axios
      .get(
        `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists
        /${
          this.props.playlistsID
        }`,
        axiosConfig
      )
      .then(response => {
        this.setState({ playlistsDetails: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  changePlaylists = () => {
    if (this.state.playlistsEdition === "editButton") {
      this.setState({ playlistsEdition: "playlistsEditForm" });
    } else {
      this.setState({ playlistsEdition: "editButton" });
    }
  };

  handlePlaylistChange = event => {
    const newPlaylistsValue = event.target.value;

    this.setState({ name: newPlaylistsValue });
  };

  handleCreatePlaylist = () => {
    const body = {
      name: this.state.name,
    };

    axios
      .put(
        `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${
          this.props.playlistsId
        }`,
        body,
        axiosConfig
      )
      .then(() => {
        this.setState({ name: ""});
        this.getPlaylistsDetails();
        this.changePlaylistsEdition();
        alert(`Playlist ${this.state.playlist} editada com sucesso!`);
      })
      .catch(error => {
        alert("Erro ao criar a playlist");
        console.log(error);
      });
  };

  render() {
    const PlaylistsEdition =
      this.state.playlistsEdition === "editButton" ? (
        <button onClick={this.changePlaylistsEditionField}>Editar</button>
      ) : (
        <div>
          <input
            placeholder="Playlists"
            type="text"
            value={this.state.name}
            onChange={this.handleNameChange}
          />
          <button onClick={this.handleCreatePlaylist}>Salvar edição</button>
        </div>
      );

    return (
      <div>
        <div>
          <p>{this.state.playlistsDetails.name}</p>
        </div>
        <div>{PlaylistsEdition}</div>
        <hr />
        <button onClick={this.props.changePage}>
          Voltar para lista de usuários
        </button>
      </div>
    );
  }
}

export default PlaylistsDetails;