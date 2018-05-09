import React, { Component } from 'react';

import NavBar from "../components/NavBar";
import ScoreTable from "../components/ScoreTable";

class ScoreTableScreen extends Component {
  render() {
    return (
      <div>
        <NavBar />
        {/* this.props.match.params.gameId lấy :gameId của <Route exact path="/:gameId" component={ScoreTableScreen} /> */}
        <ScoreTable gameId={this.props.match.params.gameId} /> 
      </div>
    );
  }
}

export default ScoreTableScreen;