
const getCurrentEnvironment = () => {
	const { NODE_ENV, ENV_CONTENTSERVICE_ROUTE } = process.env;
	return ENV_CONTENTSERVICE_ROUTE && NODE_ENV !== 'development'
		? ENV_CONTENTSERVICE_ROUTE
		: NODE_ENV;
};

module.exports = {
	currentEnvironment: getCurrentEnvironment()
};