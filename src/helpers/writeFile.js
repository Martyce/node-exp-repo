const fs = require('fs');
module.exports = {
	writeFile
};
function writeFile(buffer, path, option){
	return new Promise((resolve, reject) => {
		fs.writeFile(path, buffer, option, (err) => {
			if(err) reject(err);
			resolve(path);
		});
	});
}