const jwt = require('jsonwebtoken');
function verify(req, res, next) {
	const token = req.header('auth-token');
	if (!token) return res.status(401).send('ACCESS DENIED');

	try {
		const verified = jwt.verify(token, process.env.API_KEY);
		const diff_dates = Math.abs(new Date() - new Date(0).setUTCSeconds(verified.exp));
		const totalMinutes = Math.floor((diff_dates / 1000) / 60);
		req.user = verified;
		if (totalMinutes < 0) {
			res.status(401).send('Invalid token');
		} else if (totalMinutes < 60) {
			const generatedToken = jwt.sign({
				id: verified.id,
				role: verified.role,
				firstName: verified.firstName,
				lastName: verified.lastName,
				imageUrl: verified.imageUrl,
			}, process.env.API_KEY, {
				expiresIn: 7200 // Expires in 2hrs
			});
			res.header('refresh-token', generatedToken);
			next();
		} else {
			next();
		}
	} catch (err) {
		res.status(401).send('Invalid token');
	}
}

export default verify;