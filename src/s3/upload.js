const aws = require('aws-sdk');
const s3AccessConfig = require('../configs/config').s3;
const s3Bucket = require('../configs/config').uploadConfig.bucket;
const logger = require('../configs/winstson');

module.exports = {
	uploadFileToS3,
	updateToS3WithURL
};

function updateToS3WithURL(file, data) {
	var s3config = new aws.Config(s3AccessConfig);
	var s3 = new aws.S3(s3config);	

	return new Promise(async (resolve, reject) => {
		var params = {
			Body: file.data,
			Bucket: s3Bucket,
			ContentType: file.mimetype,
			CacheControl: 'max-age=31536000',
			Key: data.assetLocation,
			Tagging: `position=${data.position}`,
			ACL: 'public-read'
		};

		try {
			let returnURL = await s3.upload(params).promise();
			resolve(returnURL);
		} catch (error) {
			reject(error);
		}
	});
}

function uploadFileToS3(file, data) {
	var s3config = new aws.Config(s3AccessConfig);
	var s3 = new aws.S3(s3config);

	return new Promise((resolve, reject) => {
		var params = {
			Body: file.data,
			Bucket: s3Bucket,
			ContentType: file.mimetype,
			CacheControl: 'max-age=31536000',
			Key: data.assetLocation,
			Tagging: `position=${data.position}`,
			ACL: 'public-read'
		};
		s3.putObject(params, function (err, data) {
			if (err) {
				logger.error(err); // an error occurred
				reject('Unable to upload file to S3');
			} else {
				resolve();
			}
		});
	});
}