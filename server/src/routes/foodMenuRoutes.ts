import express from 'express';
import {
	createFoodMenu,
	getFoodMenu,
	deleteFoodMenu,
	editFoodMenu,
} from '../controllers/foodMenuControllers';
import { validateFoodMenu } from '../validators/foodMenuValidators';
import { authenticateUser } from '../middleware/authMiddleware';
import { upload } from '../middleware/uploadMiddleware';

const router = express.Router();

// Casting routes as express.RequestHandler. This aligns with Express's expected types and ensures TypeScript recognizes them as valid request handlers.

router
	.route('/')
	.post(
		upload.single('image'),
		validateFoodMenu,
		authenticateUser as express.RequestHandler,
		createFoodMenu as express.RequestHandler
	)
	.get(getFoodMenu as express.RequestHandler);

router
	.route('/:id/')
	.patch(
		validateFoodMenu,
		authenticateUser as express.RequestHandler,
		editFoodMenu as express.RequestHandler
	)
	.delete(
		authenticateUser as express.RequestHandler,
		deleteFoodMenu as express.RequestHandler
	);

export default router;
