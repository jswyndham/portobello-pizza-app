import express from 'express';
import {
	createFoodMenu,
	getFoodMenu,
	deleteFoodMenu,
} from '../controllers/foodMenuControllers';
import { authenticateUser } from '../middleware/authMiddleware';
import { validateFoodMenu } from '../validators/foodMenuValidators';

const router = express.Router();

router.post('/food-items', authenticateUser, validateFoodMenu, createFoodMenu);
router.get('/food-items', authenticateUser, getFoodMenu);
router.delete('/food-items', authenticateUser, deleteFoodMenu);

export default router;
