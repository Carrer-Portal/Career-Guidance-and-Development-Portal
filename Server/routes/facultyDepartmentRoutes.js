import express from 'express';
import {
  getAllFaculties,
  getAllDepartments,
  createFaculty,
  createDepartment,
  updateDepartment,
} from '../controllers/facultyDepartmentController.js';

const router = express.Router();
console.log('facultyDepartmentRoutes.js');
router.get('/getAllfaculties', getAllFaculties);
router.get('/getAlldepartments', getAllDepartments);
router.post('/new-faculty', createFaculty);
router.post('/new-department', createDepartment);
router.put('/departments/:departmentId', updateDepartment);

export default router;