let appRoot = require('app-root-path');
let winston = require('winston');

let options = {
	file: {
		level: 'info',
		filename: `${appRoot}/src/logs/app.log`,
		handleExceptions: true,
		json: true,
		maxsize: 5242880, // 5MB
		maxFiles: 5,
		colorize: false,
	},
	console: {
		level: 'debug',
		handleExceptions: true,
		json: false,
		colorize: true,
	},
};

const logger =  winston.createLogger({
	format: winston.format.combine(
		winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
		winston.format.prettyPrint()
	),
	transports: [
		new winston.transports.File(options.file),
		new winston.transports.Console(options.console)
	],
	exitOnError: false, // do not exit on handled exceptions
});

logger.stream = {
	write: function(message) {
		logger.info(message);
	},
};

module.exports = logger;