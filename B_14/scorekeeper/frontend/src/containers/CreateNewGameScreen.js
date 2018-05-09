import React, { Component } from 'react';

import NavBar from "../components/NavBar";
import CreateNewGame from "../components/CreateNewGame";
import axios from '../axios';


class CreateNewGameScreen extends Component {
  state = {
    playerNames: ["", "", "", ""],
    idGame: null
  };

  _onCreateNewGame = (playerNames) => {
    axios
      .post('/api/games', {
        playerNames: this.state.playerNames
      })
      .then(data => {
        console.log(data.data._id);
        console.log(this.state.playerNames);

        this.props.history.push(`/${data.data._id}`);//Chuyển trang
        this.setState({ playerNames: playerNames, idGame: data.data._id });
      })
      .catch(err => console.log(err))
  }

  _onHandleTextChange = (players) => {
    this.setState({ playerNames: players });
  }

  render() {
    return (
      <div>
        <NavBar />
        <CreateNewGame startGame={this._onCreateNewGame} onHandleTextChange={this._onHandleTextChange} />
      </div>

    );
  }

}

export default CreateNewGameScreen;