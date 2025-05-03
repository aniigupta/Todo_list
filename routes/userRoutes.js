import express from 'express';
import { register, Login, Logout } from '../controller/userController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', Login);
router.post('/logout', Logout)

export default router;
