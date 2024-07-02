import express from 'express';
import {
	createDrinkMenu,
	editDrinkMenu,
	getDrinkMenu,
	deleteDrinkMenu,
} from '../controllers/drinkMenuControllers';
import { authenticateUser } from '../middleware/authMiddleware';
import { validateDrinkMenu } from '../validators/drinkMenuValidator';

const router = express.Router();

// Casting routes as express.RequestHandler. This aligns with Express's expected types and ensures TypeScript recognizes them as valid request handlers.

router
	.route('/')
	.post(
		authenticateUser as express.RequestHandler,
		validateDrinkMenu,
		createDrinkMenu as express.RequestHandler
	)
	.get(
		authenticateUser as express.RequestHandler,
		getDrinkMenu as express.RequestHandler
	);

router
	.route('/:id/')
	.patch(
		authenticateUser,
		validateDrinkMenu,
		editDrinkMenu as express.RequestHandler
	)
	.delete(
		authenticateUser as express.RequestHandler,
		deleteDrinkMenu as express.RequestHandler
	);

export default router;
