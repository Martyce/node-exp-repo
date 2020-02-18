import { ERROR_MSG } from '../util/constants';

module.exports = {
	intParser,
	removeNull,
	isWherePresent,
	generatePaginateLinks,
	generateEmptyValueErrMsg,
	toSqlDate,
	generateNameKeyword
};

function generateEmptyValueErrMsg(fieldname) {
	let err = {};
	if(fieldname in ERROR_MSG.EMPTY_FIELD) {
		err = {
			err: ERROR_MSG.EMPTY_FIELD[fieldname]
		};
	} else {
		err = {
			err: 'Please fill out all required fields.'
		};
	}

	return err;
}

function generateNameKeyword(keyword) {
	const sanitizedKeyword = keyword.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ ]/g, ''); // Sanitize the keyword input for name search
	if (sanitizedKeyword && sanitizedKeyword !== '') {
		return `+${sanitizedKeyword.split(' ').join('* +')}*`; // Use MySQL Index Search operators for name search (e.g. '+Juan* +Dela* +Cruz*')
	}

	return keyword;
}

function intParser(start, limit) {
	let parsed = [parseInt(start), parseInt(limit)];
	return parsed;
}

function isWherePresent(whereString) {
	return whereString === '' ? ' WHERE ' : ' AND ';
}
function removeNull(obj) {
	if (Array.isArray(obj) && obj.length) {
		obj.forEach(item => {
			removeNull(item);
		});
	} else {
		for (let key in obj) {
			if (
				obj[key] === null ||
				(obj[key] && !Array.isArray(obj[key]) && !obj[key].toString().trim()) ||
				!obj[key]
			) {
				delete obj[key];
			}
		}
	}
}

function toSqlDate(dateInput) {
	const convertedDate = new Date(dateInput);
	if(dateInput instanceof String) {
		convertedDate.setDate(convertedDate.getDate() + 1);
	}

	return convertedDate.toISOString().split('T')[0];
}
