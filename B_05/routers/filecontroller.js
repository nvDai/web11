//Tạo module

const  fs = require('fs');
let readFile = (path) => {
	return JSON.parse(fs.readFileSync(path, 'utf8'));
}
let readFileSync = (path) => {
	return JSON.parse(fs.readFileSync(path, 'utf8'));//readfile phải chuyển 1 JSON sang object 
}
let readFileCallBack = (path, callback) => {
	fs.readFile(path, 'utf8', (err, data) => {
		if(err) {
			console.log(err);
		}
		callback(data);
	});
}
let writeFile = (path, writedata, onWriteDataDone) => {
	fs.writeFile(path, JSON.stringify(writedata), (err) => { //writefile phải chuyển sang object sang JSON string để ghi
		if(err) {
			console.log(err);
		}
		onWriteDataDone("Success");
	});
}

module.exports = {
	readFile,
	writeFile,
	readFileCallBack,
	readFileSync
}