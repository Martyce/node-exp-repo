import express from 'express';
import sampleRoute from './sampleRoute';
const route = '/indext/api/v1';
export default server => {
	server.use(route + '/sample', sampleRoute);
};
