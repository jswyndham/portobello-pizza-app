import express from 'express';
import {
	getAllUsers,
	editUser,
	deleteUser,
} from '../controllers/userControllers';
import { validateGetAllUsers } from '../validators/userValidators';
import { validateRegisterUser } from '../validators/authValidators';
import { authenticateUser } from '../middleware/authMiddleware';

const router = express.Router();

// Casting routes as express.RequestHandler. This aligns with Express's expected types and ensures TypeScript recognizes them as valid request handlers.

router
	.route('/')
	.get(
		authenticateUser as express.RequestHandler,
		validateGetAllUsers,
		getAllUsers as express.RequestHandler
	);

router
	.route('/:id')
	.patch(
		authenticateUser as express.RequestHandler,
		validateRegisterUser,
		editUser as express.RequestHandler
	)
	.delete(
		authenticateUser as express.RequestHandler,
		deleteUser as express.RequestHandler
	);

export default router;
