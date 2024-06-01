import express from 'express';
import { createFoodMenu } from '../controllers/foodMenuControllers/createFoodMenuController';
import { authenticateUser } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/create', authenticateUser, createFoodMenu);

export default router;
