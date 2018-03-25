const express = require('express');
const router = express.Router();
const questionController = require("../controllers/questionController");

router.get('/', (req, res)=>{
    questionController.findAll((collections => {
        let id = Math.floor(Math.random()*collections.length);
        if(collections.length === 0) {
            res.render('home1', {
                question: "Chưa có câu hỏi",
                activeQuestion: "active"
            })
        } else {
            res.render('home', {
                question : collections[id].questionContent,
                id: collections[id]._id,
                activeQuestion: "active"
            });//(ở trong views/main.handlebars)

        }
    }))
    
});

module.exports = router;