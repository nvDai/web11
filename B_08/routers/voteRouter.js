const express = require('express');
const router = express.Router();
const questionController = require("../controllers/questionController");

router.get('/:id/:choose',(req,res)=>{
    let id = req.params.id
    let choose = req.params.choose;
    questionController.updateYesNo(choose, id, (err) => {
        res.redirect('/question/' + id);
        // if(choose === 'yes') {
        //     question.yes += 1;
        // } else {
        //     question.no += 1;
        // }
        // fileController.writeFile('./data.json', questionList, (err) =>{
        //     if(err) console.log(err);
        //     res.redirect('/question/info/' + id);
        // })
        
    })    
})


module.exports = router;