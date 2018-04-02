const express = require('express');
const router = express.Router();
const fileController = require("./filecontroller");

router.get('/:id/:choose',(req,res)=>{
    let id = req.params.id;
    let questionList = fileController.readFileSync('./data.json');
    let question = questionList[id - 1];
    let choose = req.params.choose;
    
    if(choose === 'yes') {
        question.yes += 1;
    } else {
        question.no += 1;
    }
    fileController.writeFile('./data.json', questionList, (err) =>{
        if(err) console.log(err);
        res.redirect('/question/info/' + id);
    }
    )
})

module.exports = router;