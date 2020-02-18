'use strict';
import express from 'express';
import authController from '../controllers/AuthController.js/authController';
const router = express.Router();

router.post('/login',
	authController.authEmailController
);

export default router;