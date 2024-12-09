import express from 'express';
import {rateMyResume} from '../controllers/chatController.js';

const router = express.Router();

router.post('/resume-rate', rateMyResume);

export default router;