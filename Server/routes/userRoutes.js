import express from 'express';
import {undergraduateRegister,undergraduatelogin} from '../controllers/userController.js';

const router = express.Router();

//register route undergraduate
router.post('/register',undergraduateRegister);

//login route undergraduate
router.post('/login',undergraduatelogin);
console.log("router");

export default router;