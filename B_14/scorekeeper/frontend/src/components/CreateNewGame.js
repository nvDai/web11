import React, { Component } from 'react';

class CreateNewGame extends Component {
    state = {
        players: ["", "", "", ""]
    }

    handleChange = (index, value) => {
        const newPlayers = this.state.players.map((name, pIndex) => pIndex === index ? value : name);
        this.props.onHandleTextChange(newPlayers);
        this.setState({ players: newPlayers });
    }

    _onStartGame = (e) => {
        e.preventDefault();
        this.props.startGame(this.state.players)
    };

    render() {
        const nameInputs = this.state.players.map((name, index) => (
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder={`Player ${index + 1} name`}
                    value={name}
                    onChange={(event) => this.handleChange(index, event.target.value)}
                />
            </div>
        ))

        return (
            <form>
                {nameInputs}
                <button className="button_glow" onClick={this._onStartGame} type="submit" >Create a new game</button>
            </form>

        );
    }
}

export default CreateNewGame;