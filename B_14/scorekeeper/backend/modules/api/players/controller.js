const gameModel = require('./model');

const creatPlayer = ({player1Name, player2Name, player3Name, player4Name, scores}) => new Promise((resolve, reject) => {
    gameModel.create({
        player1Name,
        player2Name,
        player3Name, 
        player4Name, 
        scores: [[0,0,0,0]]
    })
    .then(data => resolve(data))
    .catch(err => reject(err))
});

const addRoundScore = (id) => new Promise((resolve, reject) => {
    gameModel
    .update({
        _id: id
    }, {
          $push: { scores: [[0, 0, 0, 0]]}
        }
    )
    .then(data => resolve(data))
    .catch(err => reject(err))
});

const updateScore = ({id , rowIndex, scoreArr}) => new Promise((resolve, reject) => {
    
    gameModel
    .update({
          _id: id
        }, {
            $set: { [`scores.${rowIndex}`]: scoreArr }
        }
    )
    .then(data => resolve(data))
    .catch(err => reject(err))
});



const getPlayers = (id) => new Promise((resolve, reject) => {
    gameModel
    .findOne({
        _id: id
    })
    .then(data => resolve(data))
    .catch(err => reject(err))
})

module.exports = {
    creatPlayer,
    getPlayers,
    addRoundScore,
    updateScore
}