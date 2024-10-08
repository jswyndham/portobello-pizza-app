import express from 'express';
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

const router = express.Router();

// Routes
router.post(
	'/register',
	authenticateUser as express.RequestHandler,
	validateRegisterUser,
	registerUser as express.RequestHandler
);
router.post('/login', validateLoginUser, loginUser as express.RequestHandler);
router.get(
	'/status',
	authenticateUser as express.RequestHandler,
	authStatus as express.RequestHandler
); // No authentication middleware here
router.post(
	'/logout',
	authenticateUser as express.RequestHandler,
	logoutUser as express.RequestHandler
);

export default router;
