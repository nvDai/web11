import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import CreateNewGameScreen from "./containers/CreateNewGameScreen";
import ScoreTableScreen from "./containers/ScoreTableScreen";

import { BrowserRouter, Route } from "react-router-dom";

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="App container">
          <Route exact path="/" component={CreateNewGameScreen} />          
          <Route exact path="/:gameId" component={ScoreTableScreen} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
