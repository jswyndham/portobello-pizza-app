import { Router } from 'express';
import { registerUser } from '../controllers/authControllers/registerUserController';
import { loginUser } from '../controllers/authControllers/loginUserController';
import {
	validateRegisterUser,
	validateLoginUser,
} from '../validators/authValidators';
import { authenticateUser } from '../middleware/authMiddleware';
import { logoutUser } from '../controllers/authControllers/logoutUserController';

const router = Router();

router.post('/register', validateRegisterUser, registerUser);
router.post('/login', validateLoginUser, loginUser);
router.get('/logout', authenticateUser, logoutUser);

export default router;
