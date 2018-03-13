const express = require('express');
const path = require('path');

let app = express();
app.use(express.static('public'));

app.get('/style.css', (req, res) => {
	res.sendFile(path.resolve(__dirname, './public/css/personal.css'));
});

app.get('/index', (req, res) => {
	res.sendFile(path.resolve(__dirname, './public/index.html'));
});

app.get('/flex-box', (req, res) => {
	res.sendFile(path.resolve(__dirname, './public/flex-box.html'));
});

app.get('/flex-box/css', (req, res) => {
	res.sendFile(path.resolve(__dirname, './public/css/flex-box.css'));
});

app.get('/dropdown-menu', (req, res) => {
	res.sendFile(path.resolve(__dirname, './public/dropdown-menu.html'));
});

app.listen(8000, (err) => {
	if (err) {
		console.log(err);
	}
	console.log("App is start at 8000");
})
