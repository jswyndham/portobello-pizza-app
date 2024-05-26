import { Router } from 'express';
import { registerUser } from '../controllers/authControllers/registerUserController';
import { validateRegisterUser } from '../validators/authValidators';

const router = Router();

router.post('/register', validateRegisterUser, registerUser);

export default router;
