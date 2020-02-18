import dbPool from '../configs/db-mysql';

module.exports = function(query, values) {
	return new Promise((resolve, reject) => {
		dbPool.getConnection((err, dbConnection) => {
			if (err) {
				reject({
					status: 500,
					message: 'Database Error',
					errorMessage: err
				});
			}

			dbConnection.query(query, values, (err, results) => {
				dbConnection.release();
				if(err) return reject(err);

				resolve(results);
			});
		});
	});
};
