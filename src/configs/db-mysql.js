const mysql = require('mysql');
const config = require('./config');
const logger = require('./winstson');

const dbConnectionInfo = {
	user: config.database.user,
	password: config.database.password,
	host: config.database.server,
	database: config.database.database,
	port: config.database.port,
	connectionLimit: config.database.connectionLimit,
	options: config.database.options
};


var dbPool = mysql.createPool(
	dbConnectionInfo
);

dbPool.on('connection', function (connection) {
	logger.log({
		level: 'info',
		message: 'DB Connection established'
	});

	connection.on('error', function (err) {
		logger.log({
			level: 'info',
			message: (new Date(), 'MySQL error', err.code)
		});

	});
	connection.on('close', function (err) {
		logger.log({
			level: 'info',
			message: (new Date(), 'MySQL close', err.code)
		});
	});

});

module.exports = dbPool;