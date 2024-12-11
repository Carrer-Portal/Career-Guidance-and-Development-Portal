import express from 'express';
import {
    createWorkshop,
    updateWorkshop,
    deleteWorkshop,
    findWorkshopById,
    findAllWorkshops,
    findWorkshopsByFacultyAndDepartment,
    findWorkshopsByCareerAdvisorId,
    upload
} from '../controllers/workshopController.js';

const router = express.Router();

router.post('/new', upload.single('workshopBannerFile'), createWorkshop);
router.put('/update/:id', updateWorkshop);
router.delete('/delete/:id', deleteWorkshop);
router.get('/findById/:id', findWorkshopById);
router.get('/findAll', findAllWorkshops);
router.get('/findBy/faculty/:facultyId/department/:departmentId', findWorkshopsByFacultyAndDepartment);
router.get('/findBy/careerAdvisor/:careerAdvisorId', findWorkshopsByCareerAdvisorId);
export default router;