import express from 'express';
import {
    createAppointment,
    updateAppointment,
    deleteAppointment,
    findAppointmentById,
    findAppointmentsByUndergraduateId,
    findAppointmentsByCareerAdvisorId,
    acceptAppointment,
    declineAppointment
} from '../controllers/appoinmentController.js';

const router = express.Router();

router.post('/create', createAppointment);
router.put('/update/:id', updateAppointment);
router.delete('/delete/:id', deleteAppointment);
router.get('/find/:id', findAppointmentById);
router.get('/findByUndergraduate/:undergraduateId', findAppointmentsByUndergraduateId);
router.get('/findByCareerAdvisor/:careerAdvisorId', findAppointmentsByCareerAdvisorId);
router.put('/accept/:id', acceptAppointment);
router.put('/decline/:id', declineAppointment);

export default router;