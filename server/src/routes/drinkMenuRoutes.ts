import express from 'express';
import {
	createDrinkMenu,
	editDrinkMenu,
	getDrinkMenu,
	deleteDrinkMenu,
	getDrinkMenuItem,
} from '../controllers/drinkMenuControllers';
import { authenticateUser } from '../middleware/authMiddleware';
import { validateDrinkMenu } from '../validators/drinkMenuValidator';
import multer from 'multer';

// Casting routes as express.RequestHandler. This aligns with Express's expected types and ensures TypeScript recognizes them as valid request handlers.

const upload = multer();

const router = express.Router();

router
	.route('/')
	.post(
		upload.none(),
		authenticateUser as express.RequestHandler,
		validateDrinkMenu,
		createDrinkMenu as express.RequestHandler
	)
	.get(getDrinkMenu as express.RequestHandler);

router
	.route('/:id/')
	.get(getDrinkMenuItem as express.RequestHandler)
	.patch(
		authenticateUser as express.RequestHandler,
		validateDrinkMenu,
		editDrinkMenu as express.RequestHandler
	)
	.delete(
		authenticateUser as express.RequestHandler,
		deleteDrinkMenu as express.RequestHandler
	);

export default router;
