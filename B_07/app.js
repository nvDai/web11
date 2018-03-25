const express = require('express');
const path = require('path');//
const handlebar = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const questionController = require("./controllers/questionController");
const homeRouter = require("./routers/homeRouter");
const askRouter = require("./routers/askRouter");
const questionRouter = require("./routers/questionRouter");
const voteRouter = require("./routers/voteRouter");

let app = express();

app.use(bodyParser.urlencoded({extended: false})); //body-parser dùng với form để lấy dữ liệu đưa vào body
app.engine('handlebars', handlebar({defaultLayout: 'main'}));//khai bao engine ten la handlebar(ở trong views/layouts/main.handlebars)
app.set('view engine', 'handlebars');//Cai dat(view engine là mặc định), handlebars là app

app.use('/', homeRouter);//Khi vào / sẽ nhận questionRouter
app.use('/ask', askRouter);
app.use('/question', questionRouter);
app.use('/vote', voteRouter);
app.use(express.static('public'));//Fix lỗi không load được css, public là tên thư mục

mongoose.connect('mongodb://localhost/buoi_7', (err)=>{
    if(err) console.log(err);
    console.log("Database is conected!!!");
} );

app.listen(6969, (err) => {
    if(err) {
        console.log(err);
    }
    console.log("App is start at 6969");
})






