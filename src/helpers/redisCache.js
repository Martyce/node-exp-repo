// const {redisClient} = require('../configs/redis')

// module.exports = (req, res, next) => {
// 	const org = req.query.org
// 	redisClient.get(org, function (err, data) {
      
// 		if (err) throw err
// 		if (data != null) {
// 			res.send(respond(org, data))
// 		} else {
// 			next()
// 		}
// 	})
// 	next()
// }