import React, { Component } from 'react';

import NavBar from "../components/NavBar";
import ScoreTable from "../components/ScoreTable";

class ScoreTableScreen extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <ScoreTable gameId={this.props.match.params.gameId} />
      </div>
    );
  }
}

export default ScoreTableScreen;