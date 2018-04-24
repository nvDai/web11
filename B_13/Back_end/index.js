const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session"); //dùng khi đăng nhập để sever biết user đã đăng nhập thông qua sessionId
const config = require("./config.json"); //lưu lại những keys quan trọng của project

const app = express();

const imageRouter = require('./modules/api/images/router'); 
const userRouter = require('./modules/api/users/router'); 
const authRouter = require('./modules/api/auth/router')

// server -> session: {
//   sessionId: 12387123,
//   username: AVAVT
// }

// client -> cookie: {
//   sessionId: 12387123
// }

app.use(
    session({
      secret: config.sessionSecret, //quan trọng của project không được tiết lộ
      resave: false, //Mỗi lần user truy cập vào web mà không chỉnh sửa thì có cần lưu đè thông tin ko?
      saveUninitialized: false, //nếu user không đăng nhập thì có save cookie không?(true: các web site bán hàng khi cần lưu lại giỏ hàng của user mà user không đăng nhập)
      cookie: {
        secure: config.secureCookie,
        maxAge: 12 * 60 * 60 * 1000 //Thời gian cookie tồn tại sau khi user rời khỏ website, sau này sẽ có thêm 1 thuộc tính secure: true để gửi cookie qua https đê cookie được mã hóa, còn để false thì gửi qua http thì cookie không được mã hóa
      }
    })
);

app.use(bodyParser.urlencoded({extended: false}));

app.use('/api/auth', authRouter);
app.use('/api/images', imageRouter); //post bên router dùng link của use
app.use('/api/users', userRouter);


app.get('/', (req, res) => {
    res.status(404).send("404 NOT FOUND");
})

mongoose.connect(config.mongodbPath , (err) => {
    if (err) console.log(err);
    else console.log('Database connect successful!');
});
const port = process.env.port || 6969;

app.listen(port, (err) => {
    if (err) console.log(err)
    console.log("Sever is started at port " + port);
})