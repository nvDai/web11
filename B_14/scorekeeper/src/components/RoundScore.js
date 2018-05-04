import React, { Component } from 'react';

class RoundScore extends Component {
    render() {
        return (
            <tr>
                <td>Round {this.props.round}</td>
                
                <td><input type="text" placeholder="0" value={this.props.player1Score} className="score-box" /></td>
                <td><input type="text" placeholder="0" value={this.props.player2Score} className="score-box" /></td>
                <td><input type="text" placeholder="0" value={this.props.player3Score} className="score-box" /></td>
                <td><input type="text" placeholder="0" value={this.props.player4Score} className="score-box" /></td>
            </tr>
        );
    }
}

export default RoundScore;