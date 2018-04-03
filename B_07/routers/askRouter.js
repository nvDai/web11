const express = require('express');
const router = express.Router();//Hỗ trợ chia router cho sever
const questionController = require("../controllers/questionController");

router.get('/', (req, res)=> {
    res.render('ask', {
        activeAsk: "active"
    });
});


router.post('/', (req, res)=> {
    try {
        questionController.create(req.body.question, (collection)=> {
            res.redirect('/question/'+ collection._id);
        });
    } catch (ex) {
        console.log(ex);
    }
    
});

module.exports = router;