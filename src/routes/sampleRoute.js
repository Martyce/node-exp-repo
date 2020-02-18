'use strict';
import express from 'express';
import {
    getSampleCall
} from '../controllers/sampleController/getSample';

const router = express.Router();

router.get('/', getSampleCall);


export default router;