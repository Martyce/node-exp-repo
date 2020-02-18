import {
	currentEnvironment
} from '../util/constants';


const defaultConfig = {
	s3: {
		region: process.env.ENV_S3_REGION,
		accessKeyId: process.env.ENV_S3_ACCESS_KEY_ID,
		secretAccessKey: process.env.ENV_S3_SECRET_ACCESS_KEY
	},
	uploadConfig: {
		bucket: process.env.ENV_UPLOAD_BUCKET
	}
};

const config = {
	development: {
		database: {
			user: 'root',
			password: '',
			server: 'localhost',
			database: 'dbname',
			port: 3306,
			connectionLimit: 10,
			options: {
				encrypt: true
			}
		}
	},
};

module.exports = Object.assign(config[currentEnvironment], defaultConfig);
