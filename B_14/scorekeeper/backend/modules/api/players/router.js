const express = require('express');
const Router = express.Router();

const playerController = require('./controller');

Router.post('/', (req, res) => {
    playerController
    .creatPlayer(req.body)
    .then(players => res.send(players))
    .catch(err => {
        console.log(err);
        res.status(500).send(err);
    })
})
//res.send(players)
Router.get('/:id', (req, res) => { 
    let id = req.params.id;
    idGame = id;
    playerController
    .getPlayers(id)
    .then(players => res.send(players))
    .catch(err => {
        console.log(err);
        res.status(500).send(err);
    })
    
})
Router.post('/:id/addroundscore', (req, res) => {
    playerController
    .addRoundScore(req.params.id)
    .then(data => res.send(data))
    .catch(err => {
        console.log(err);
        res.status(500).send(err);
    })
});

Router.put('/:id/updatescore', (req, res) => {
    req.body.id = req.params.id;
    playerController
    .updateScore(req.body)
    .then(data => res.send(data))
    .catch(err => {
        console.log(err);
        res.status(500).send(err);
    })
})

module.exports = Router;