const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameModel = new Schema({
    playerName1: { type: String, required: true },
    playerName2: { type: String, required: true },
    playerName3: { type: String, required: true },
    playerName4: { type: String, required: true },
    scores: [[{ type: Number, require: true, default: 0 }]]
},
{ timestamps: true })

module.exports = mongoose.model('games', gameModel);