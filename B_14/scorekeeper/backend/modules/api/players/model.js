const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameModel = new Schema({
    player1Name: { type: String, required: true },
    player2Name: { type: String, required: true },
    player3Name: { type: String, required: true },
    player4Name: { type: String, required: true },
    scores: [[{ type: Number, required: true, default: 0 }]]
},
{ timestamps: true })

module.exports = mongoose.model('games', gameModel);