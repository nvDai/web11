const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json({urlEncode: true}));

app.get('/', (req, res) => {
    res.send("OK")
})

// mongoose.connect('http://localhost:27017/chelsea-hotboys', (err) => {
//     if (err) console.log(err);
//     else console.log('Database connect successful!');
// });
const port = process.env.port || 6969;

app.listen(port, (err) => {
    if (err) console.log(err)
    console.log("Sever is started at port " + port);
})