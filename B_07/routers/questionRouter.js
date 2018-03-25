const express = require('express');
const router = express.Router();
const questionController = require("../controllers/questionController");

router.get('/:id', (req,res) =>{
    var id = req.params.id;
    questionController.getQuestionByID(id, (collection) => {
            // let questionList = [ ...fileController.readFileSync('./data.json') ]; ///... để nối mảng
            let question = collection;
            let total = question.yes + question.no;
            let yesRate = (question.yes * 100 / (question.yes + question.no)).toFixed(2);
            let noRate = (question.no * 100 / (question.yes + question.no)).toFixed(2);
            if(total == 0) {
                yesRate = noRate = 50;
            }
            res.render('question',{
            question: question.questionContent,
            id: question.id,
            yes: question.yes,
            no: question.no,
            totalVote: total,
            noRate: noRate,
            yesRate: yesRate,
            activeQuestion: "active"
        });
    });
    
});



module.exports = router;