import express from 'express';
import {undergraduateRegister,undergraduatelogin,whoAmI, forgetPassword, updateUndegratuatePassword,updateUndegratuateUser} from '../controllers/userController.js';
import { createAdminAccount, adminLogin, updateAdmin, findAdminById } from "../controllers/userController.js";
const router = express.Router();

//register route undergraduate
router.post('/register',undergraduateRegister);

//login route undergraduate
router.post('/login',undergraduatelogin);
//wami
router.get('/wami',whoAmI);

router.post('/forgetPassword', forgetPassword)

router.put('/update/:id', updateUndegratuateUser);
router.put('/update/password/:id', updateUndegratuatePassword);

router.post("/admin/create", createAdminAccount);
router.post("/admin/login", adminLogin);
router.put("/admin/update/:adminId", updateAdmin);
router.get("/admin/:adminId", findAdminById);

export default router;