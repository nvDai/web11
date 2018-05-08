import React, { Component } from 'react';
import ScoreRound from './ScoreRound';
import axios from '../axios';

class ScoreTable extends Component {
    state = {
        playerScore: [[0, 0, 0, 0]],
        sumOfPlayerScore: [0, 0, 0, 0],
        playerNames: ["", "", "", ""],
        sumOfScore: 0
    }

    componentDidMount() {
        axios
            .get(`/api/games/${this.props.gameId}`)
            .then(data => {
                console.log(data.data);
                this.setState({ playerNames: data.data.playerNames });
                this.setState({ playerScore: data.data.scores })
                console.log(this.state.playerScore);
            })
            .catch(err => console.log(err))
    }

    _onAddRound = () => {
        axios
            .post(`/api/games/${this.props.gameId}/addroundscore`)
            .then(this.setState({ playerScore: [...this.state.playerScore, [0, 0, 0, 0]] }))
            .catch(err => console.log(err))
    };

    _checkInput = (value) => {
        let score = "" + value;
        let regex_Negative_Score = /(-[0-9]{1,})/;
        let regex_Positive_Score = /([0-9]{1,})/;

        if (score.match(regex_Negative_Score) || score.match(regex_Positive_Score)) {
            return true;
        } else {
            return false;
        }
    }
    _onChangeScore = (rowIndex, colIndex, scoreInput) => {
        let scores = this.state.playerScore;
        let sumOfScore = 0;
        let sumOfPlayerScore = [0, 0, 0, 0];
        let NUMBER_LOOP = this.state.playerScore.length;

        if (!this._checkInput(scoreInput)) {
            return;
        } else {
            scores[rowIndex][colIndex] = scoreInput;
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < NUMBER_LOOP; j++) {
                    if (isNaN(parseInt(scores[j][i], 10))) {
                        sumOfPlayerScore[i] += 0;
                    } else {
                        sumOfPlayerScore[i] += parseInt(scores[j][i], 10);
                    }

                }
                sumOfScore += sumOfPlayerScore[i];
            }
            this.setState({ sumOfPlayerScore: sumOfPlayerScore, sumOfScore: sumOfScore })

            axios
                .put(`/api/games/${this.props.gameId}/updatescore`, {
                    id: this.props.gameId,
                    rowIndex: rowIndex,
                    scoreArr: scores[rowIndex]
                })
                .then(
                    this.setState({ sumOfPlayerScore: sumOfPlayerScore, sumOfScore: sumOfScore, playerScore: scores })
                )
                .catch(err => console.log(err))
        }
    }

    _addingRound = (roundNumber, scores) => {
        let rounds = [];
        for (let i = 0; i < roundNumber; i++) {
            rounds.push(
                <ScoreRound
                    round={i + 1}
                    playerScore={[scores[i][0], scores[i][1], scores[i][2], scores[i][3]]}
                    onChangeScore={this._onChangeScore}
                />
            )
        }
        return rounds;
    }

    render() {
        const playerName = this.state.playerNames.map((name, index) => (
            <td className="player-name">{name}</td>
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
                        <th>Sum of Score(<span>{this.state.sumOfScore}</span>)</th>
                        {totalPlayerScore}
                    </tr>
                    {this._addingRound(this.state.playerScore.length, this.state.playerScore)}

                </table>
                <button className="button_glow btn-add-round" onClick={this._onAddRound}>ADD ROUND</button>
            </div>
        );
    }
}

export default ScoreTable;