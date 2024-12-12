import express from 'express';
import {
  submitReviewResumeRequest,
  getReviewResumesForUndergraduate,
  getReviewResumesForCareerAdvisor,
  updateReviewWithGrade,
} from '../controllers/resumeReviewController.js';

const router = express.Router();

router.post('/submit', submitReviewResumeRequest);
router.get('/undergraduate/:undergraduateId', getReviewResumesForUndergraduate);
router.get('/advisor/:careerAdvisorId', getReviewResumesForCareerAdvisor);
router.put('/update/:reviewId', updateReviewWithGrade);

export default router;