const gameModel = require('./model');

const getGames = id =>{
    return gameModel.find();
}

const creatGame = ({playerNames, scores}) => new Promise((resolve, reject) => {
    gameModel.create({
        playerNames, 
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
    for (let i = 0; i < 4; i++) {
        if(scoreArr[i] == '-') {
            scoreArr[i] = 0;
        }
    }

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



const getOneGame = (id) => new Promise((resolve, reject) => {
    gameModel
    .findOne({
        _id: id
    })
    .then(data => resolve(data))
    .catch(err => reject(err))
})

module.exports = {
    creatGame,
    getGames,
    getOneGame,
    addRoundScore,
    updateScore
}