const express = require('express');
const Router = express.Router();

const gameController = require('./controller');

Router.post('/', (req, res) => {
    gameController
        .creatGame(req.body)
        .then(players => res.send(players))
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        })
})
//res.send(players)
Router.get("/", (req, res) => {
    gameController
        .getGames()
        .then(data => res.send(data))
        .catch(err => {
            console.error(err);
            res.status(500).send(err);
        });
})
Router.get('/:id', (req, res) => {
    let id = req.params.id;
    
    gameController
        .getOneGame(id)
        .then(players => res.send(players))
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        })

})
Router.post('/:id/addroundscore', (req, res) => {
    gameController
        .addRoundScore(req.params.id)
        .then(data => res.send(data))
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        })
});

Router.put('/:id/updatescore', (req, res) => {
    req.body.id = req.params.id;
    gameController
        .updateScore(req.body)
        .then(data => res.send(data))
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        })
})

module.exports = Router;