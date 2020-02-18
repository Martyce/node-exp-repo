//npm modules
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import logger from './configs/winstson';
import responseTime from 'response-time';
import Routes from './routes/index';
import path from 'path';
import process from 'process';
import { currentEnvironment } from './util/constants';
require('../.env');
const dotenv = require('dotenv');
const server = express();
dotenv.config();

//Swagger Documentation
// const swaggerUi = require('swagger-ui-express');
// const swagger =  require('./swagger');
// server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagger));


// create the server
const port = process.env.PORT || 8081;
server.use(cors());
server.use(helmet());
server.use(bodyParser.json());
server.use(responseTime());
server.use('/public', express.static(path.join(__dirname, '/public')));
server.use(morgan('combined', { stream: logger.stream }));
server.use(function (req, res, next) {
	res.header('Access-Control-Expose-Headers', 'auth-token');
	next();
});

//used for server healthcheck for cloud formation (deploy)
server.get('/healthcheck', (req, res, next) => {
	res.status(200).send('OK');
	return next();
});

// start server
server.listen(port, function () {
	logger.info(`Server started in ${currentEnvironment} mode.`);
	if(currentEnvironment === 'production') {
		const contentServiceRoute = process.env.ENV_CONTENTSERVICE_ROUTE ? process.env.ENV_CONTENTSERVICE_ROUTE : 'undefined';
		logger.info(`Content serice route set to ${contentServiceRoute}`);
	}
	logger.info(`Listening at port ${port}`);
});


Routes(server);

module.exports = {
	server,
};
