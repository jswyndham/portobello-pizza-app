import express from 'express';
import {
	createFoodMenu,
	getFoodMenu,
	deleteFoodMenu,
	editFoodMenu,
} from '../controllers/foodMenuControllers';
import { validateFoodMenu } from '../validators/foodMenuValidators';

const router = express.Router();

router.route('/').post(validateFoodMenu, createFoodMenu).get(getFoodMenu);

router
	.route('/:id/')
	.patch(validateFoodMenu, editFoodMenu)
	.delete(deleteFoodMenu);

export default router;
