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

router
	.route('/')
	.post(authenticateUser, validateDrinkMenu, createDrinkMenu)
	.get(authenticateUser, getDrinkMenu);

router
	.route('/:id/')
	.patch(authenticateUser, validateDrinkMenu, editDrinkMenu)
	.delete(authenticateUser, deleteDrinkMenu);

export default router;
