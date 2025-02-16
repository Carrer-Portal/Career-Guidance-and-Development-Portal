import express from 'express';
import { getDashboardStats } from '../controllers/dashboadController.js';

const router = express.Router();

router.get('/stats/:advisorId', getDashboardStats);

export default router;