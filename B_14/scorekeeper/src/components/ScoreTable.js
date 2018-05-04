import React, { Component } from 'react';
import RoundScore from './RoundScore';

class ScoreTable extends Component {
    state = {
        playerScore: [[]],
        sumOfPlayerScore: [1, 4, 6, 7],
        roundNumber: 1
    }

    _onAddRound = ()=>{
        let rounds = this.state.playerScore;
        let number = this.state.roundNumber;
        number += 1;
        rounds.push([]);
        this.setState({playerScore: rounds})
        this.setState({roundNumber: number})
    };

    _onChangeScore = (rowIndex, colIndex, score) => {
        let scores = this.state.playerScore;
        if (!isNaN(score)) {
            scores[rowIndex][colIndex] = score;
        } else {
            scores[rowIndex][colIndex] = 0;
        }
        console.log(scores[rowIndex][colIndex] )
        this.setState({ playerScore: scores });
    }

    _addingRound = (roundNumber, scores) => {
        let rounds = [];
        for (let i = 0; i < roundNumber; i++) {
            rounds.push(
                <RoundScore
                    round={i + 1}
                    playerScore={[scores[i][0], scores[i][1], scores[i][2], scores[i][3]]}
                    onChangeScore={this._onChangeScore}
                />
            )
        }
        return rounds;
    }

    calculateSumScore = (playerScores, numberPlayer) => {
        let sumOfPlayerScore = this.state.sumOfPlayerScore;

        for (let i = 0; i < numberPlayer; i++) {
            for (let j = 0; j < this.state.roundNumber; j++) {
                sumOfPlayerScore[i] += playerScores[j][i];
            }
            console.log(sumOfPlayerScore[i]);
        }
        
        this.setState({ sumOfPlayerScore: sumOfPlayerScore });
    };
    
    

    render() {
        this.calculateSumScore();
        const playerName = this.props.playerNames.map((name, index) => (
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
                        <th>Sum of Score(<span>13</span>)</th>
                        {totalPlayerScore}
                    </tr>
                    {this._addingRound(this.state.roundNumber, this.state.playerScore)}

                </table>
                <button className="button_glow btn-add-round" onClick={this._onAddRound} >ADD ROUND</button>
            </div>
        );
    }
}

export default ScoreTable;