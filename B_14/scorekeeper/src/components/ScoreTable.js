import React, { Component } from 'react';
import RoundScore from './RoundScore';

class ScoreTable extends Component {
    state = {
        playerScore: [[], []],
        sumOfPlayerScore: [1, 4, 6, 7],
        roundNumber: 2
    }

    _onClick = () => {
        let number = this.state.roundNumber + 1;
        const scores = this.state.playerScore;
        scores.push([]);
        alert("hello");

        this.setstate({ roundNumber: number });
        this.setstate({ playerScore: scores });

        console.log(this.state.roundNumber);
        console.log(this.state.playerScore);
    };

    _addingRound = (roundNumber, scores) => {
        let rounds = [];
        for (let i = 0; i < roundNumber; i++) {
            rounds.push(
                <RoundScore
                    round={i + 1}
                    player1Score={scores[i][0]}
                    player2Score={scores[i][1]}
                    player3Score={scores[i][2]}
                    player4Score={scores[i][3]}
                />
            )
        }
        return rounds;
    }

    render() {
        const playerName = this.props.playerNames.map((name, index) => (
            <td>{name}</td>
        ));

        const totalPlayerScore = this.state.sumOfPlayerScore.map((score) => (
            <th>{score}</th>
        ));

        return (
            <div>
                <table id="table">
                    <tr>
                        <td></td>
                        {playerName}
                    </tr>
                    <tr className="sum-of-score">
                        <th>Sum of Score(<span>13</span>)</th>
                        {totalPlayerScore}
                    </tr>
                    {this._addingRound(this.state.roundNumber, this.state.playerScore)}

                </table>
                <button className="button_glow btn-add-round" onClick={this._onClick} >ADD ROUND</button>
            </div>
        );
    }
}

export default ScoreTable;