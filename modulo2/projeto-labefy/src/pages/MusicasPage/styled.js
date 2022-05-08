import React from "react";
import axios from "axios";

export default class App extends React.Component {
  state = {
    musicas: [],
    inputName: ""
  };

  onChangeInput = (event) => {
    this.setState({ inputName: event.target.value });
  };

  componentDidMount() {
    this.getMusicas();
  }

  getMusicas = () => {
    axios
      .get(
        "https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists",
        {
          headers: {
            Authorization: "sophia-mendonca-aragon"
          }
        }
      )
      .then((response) => {
        this.setState({ musicas: response.data.result.list });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  createPlaylist = () => {
    const body = {
      name: this.state.inputName
    };

    axios
      .post(
        "https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists",
        body,
        {
          headers: {
            Authorization: "sophia-mendonca-aragon"
          }
        }
      )
      .then((response) => {
        this.getPlaylists();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  render() {
    return (
      <main>
        <h2>Projeto Labefy</h2>

        <hr />

        <section>
          <label>
            Nome da playlist
            <input value={this.state.inputName} onChange={this.onChangeInput} />
          </label>

          <button onClick={this.createPlaylist}>Criar playlist</button>
        </section>

        <section>
          {this.state.musicas.map((musicas) => {
            return <p key={musicas.id}>{musicas.name}</p>;
          })}
        </section>
      </main>
    );
  }
}