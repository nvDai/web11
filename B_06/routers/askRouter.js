const express = require('express');
const router = express.Router();//Hỗ trợ chia router cho sever
const fileController = require("./filecontroller");

router.get('/', (req, res)=> {
    res.render('ask');
});

router.post('/', (req, res)=> {
    try {
        let questionList = [ ...fileController.readFileSync('./data.json') ]; ///... để nối mảng
        let id = questionList.length + 1;
        let newQuestion = {
            id: id,
            questionContent: req.body.question, 
            yes: 0,
            no: 0
        };
        questionList.push(newQuestion);
        fileController.writeFile('./data.json', questionList, (err) => {
            if (err) {
                console.log(err);
            }
            res.redirect('/question/info/' + id); //Chuyển về trang chủ
        });
    } catch (ex) {
        console.log(ex);
    }
    
});

module.exports = router;