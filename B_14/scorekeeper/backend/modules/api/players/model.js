const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameModel = new Schema({
    playerNames: { type: [String], required: true },
    scores: [[{ type: Number, required: true, default: 0 }]]
},
{ timestamps: true })

module.exports = mongoose.model('games', gameModel);