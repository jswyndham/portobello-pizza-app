import { Router } from 'express';
import {
	registerUser,
	loginUser,
	logoutUser,
	authStatus,
} from '../controllers/authControllers';
import {
	validateRegisterUser,
	validateLoginUser,
} from '../validators/authValidators';
import { authenticateUser } from '../middleware/authMiddleware';

const router = Router();

router.post('/register', validateRegisterUser, registerUser);
router.post('/login', validateLoginUser, loginUser);
router.get('/status', authenticateUser, authStatus);
router.post('/logout', authenticateUser, logoutUser);

export default router;
