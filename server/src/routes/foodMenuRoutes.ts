import express from 'express';
import {
	createFoodMenu,
	getFoodMenu,
	deleteFoodMenu,
	editFoodMenu,
} from '../controllers/foodMenuControllers';
import { authenticateUser } from '../middleware/authMiddleware';
import { validateFoodMenu } from '../validators/foodMenuValidators';

const router = express.Router();

router
	.route('/')
	.post(authenticateUser, validateFoodMenu, createFoodMenu)
	.get(authenticateUser, getFoodMenu);

router
	.route('/:id/')
	.patch(authenticateUser, validateFoodMenu, editFoodMenu)
	.delete(authenticateUser, deleteFoodMenu);

export default router;
