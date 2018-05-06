const gameModel = require('./model');

const creatPlayer = ({playerName1, playerName2, playerName3, playerName4, scores}) => new Promise((resolve, reject) => {
    gameModel.create({
        playerName1,
        playerName2,
        playerName3, 
        playerName4, 
        scores: [[]]
    })
    .then(data => resolve(data))
    .catch(err => reject(err))
});

const addRoundScore = (id) => new Promise((resolve, reject) => {
    gameModel
    .update({
        _id: id
    }, {
          $push: { scores: [[1, 1, 1, 1]]}
        }
    )
    .then(data => resolve(data))
    .catch(err => reject(err))
});

const updateScore = ({id , rowIndex, colIndex, score}) => new Promise((resolve, reject) => {
    gameModel
    .update({
          _id: id
        }, {
            $set: { [`scores.${rowIndex}.${colIndex}`]: score }
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