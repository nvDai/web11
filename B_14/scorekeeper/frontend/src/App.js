import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "./axios";
import "./App.css";
import NavBar from "./components/NavBar";
import CreateNewGame from "./components/CreateNewGame";
import ScoreTable from "./components/ScoreTable";


class App extends Component {
  state = {
    initializing: true,
    playerNames: ["", "", "", ""]
  };
  
  _onCreateNewGame = (playerNames) => {
    axios
      .post('/api/games', {
        player1Name: this.state.playerNames[0],
        player2Name: this.state.playerNames[1],
        player3Name: this.state.playerNames[2],
        player4Name: this.state.playerNames[3]

      })
      .then(data => {
        console.log(data);
        // this.setState({ playerNames: playerNames })
      })
      .catch(err => console.log(err))
  }

  _startGame = players => {
    this.setState({ playerNames: players});
    // this.setState({ initializing: false });
  }

 

  render() {
    const renderedComponent = this.state.initializing ? <CreateNewGame startGame={this._onCreateNewGame} /> : <ScoreTable playerNames={this.state.playerNames} />;
    return (
      <div className="App container">
        <NavBar />
        {renderedComponent}
      </div>
    );
  }
}

export default App;
