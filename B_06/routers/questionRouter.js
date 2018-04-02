const express = require('express');
const router = express.Router();
const fileController = require("./filecontroller");

router.get('/', (req, res)=>{
    let questionList = fileController.readFileSync('./data.json');
    let id = Math.floor(Math.random()*questionList.length + 1);
    if(questionList.length === 0) {
        res.render('home', {
            question: "Chưa có câu hỏi"
        })
    } else {
        res.render('home', {
            question : questionList[id - 1].questionContent,
            id: id 
        });//(ở trong views/main.handlebars)
    }
});


router.get('/info/:id', (req,res) =>{
    var id = req.params.id;
    let questionList = [ ...fileController.readFileSync('./data.json') ]; ///... để nối mảng
    let question = questionList[id - 1];
    res.render('question',{
        question: question.questionContent,
        id: question.id,
        yes: question.yes,
        no: question.no,
        totalVote: question.yes + question.no,
        noRate: Math.round(question.no * 100 / (question.yes + question.no) * 10)/10,
        yesRate: Math.round(question.yes * 100 / (question.yes + question.no) * 10)/10
    })
});

module.exports = router;