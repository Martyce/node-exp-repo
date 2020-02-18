module.exports = {
	convertCamelToProper,
	convertCamelToSnakeCase
};

function convertCamelToProper(camelCaseStr) {
	let result = camelCaseStr.replace(/([A-Z])/g, ' $1');
	return result.charAt(0).toUpperCase() + result.slice(1);
}

function convertCamelToSnakeCase(str) {
	return str
		.replace(/([A-Z])/g, (x, y) => {
			return '_' + y.toLowerCase();
		})
		.replace(/^_/, '');
}
