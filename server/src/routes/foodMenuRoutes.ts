import express from 'express';
import { createFoodMenu } from '../controllers/foodMenuControllers/createFoodMenuController';
import { getFoodMenu } from '../controllers/foodMenuControllers/getFoodMenuController';
import { authenticateUser } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/create', authenticateUser, createFoodMenu);
router.get('/food-menu-items', authenticateUser, getFoodMenu);

export default router;
