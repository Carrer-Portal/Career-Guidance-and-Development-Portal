import express from 'express';
import { rateMyResume, interactiveChat } from '../controllers/chatController.js';
import { uploadDocuments } from '../utils/uploadHelper.js';

const router = express.Router();

router.post('/resume-rate', uploadDocuments.single('resume'), rateMyResume);
router.post('/interactive-chat', interactiveChat);

export default router;