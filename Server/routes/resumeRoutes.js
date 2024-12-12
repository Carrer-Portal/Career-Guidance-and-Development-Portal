import express from 'express';
import { uploadResume, deleteResume, findResumeByUndergraduateId } from '../controllers/resumeController.js';

const router = express.Router();

router.post('/upload', uploadResume);
router.delete('/:resumeId', deleteResume);
router.get('/undergraduate/:undergraduateId', findResumeByUndergraduateId);

export default router;