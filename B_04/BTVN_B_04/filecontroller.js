//Tạo module

const  fs = require('fs');
// let readFile = (path) => {
// 	return fs.readFileSync(path, 'utf8');
// }
let readFileCallBack = (path, callback) => {
	fs.readFile(path, 'utf8', (err, data) => {
		if(err) {
			console.log(err);
		}
		callback(data);
	});
}
let writeFile = (path, writedata, onWriteDataDone) => {
	fs.writeFile(path, writeData, (err) => {
		if(err) {
			console.log(err);
		}
		onWriteDataDone("Success");
	});
}

module.exports = {
	// readFile,
	writeFile,
	readFileCallBack
}