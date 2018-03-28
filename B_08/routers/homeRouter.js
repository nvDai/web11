const express = require('express');
const router = express.Router();
const questionController = require("../controllers/questionController");

router.get('/', (req, res)=>{
    questionController.getQuestion((docs => {
        let id = Math.floor(Math.random()*docs.length);
        if(docs.length === 0) {
            res.render('home1', {
                question: "Chưa có câu hỏi",
                activeQuestion: "active"
            })
        } else {
            res.render('home', {
                question : docs[id].questionContent,
                id: docs[id]._id,
                activeQuestion: "active"
            });//(ở trong views/main.handlebars)

        }
    }))
    
});

module.exports = router;