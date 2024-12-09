import express from 'express';
import {
    createAppointment,
    updateAppointment,
    deleteAppointment,
    findAppointmentById
} from '../controllers/appoinmentController.js';

const router = express.Router();

router.post('/create', createAppointment);
router.put('/update/:id', updateAppointment);
router.delete('/delete/:id', deleteAppointment);
router.get('/find/:id', findAppointmentById);

export default router;