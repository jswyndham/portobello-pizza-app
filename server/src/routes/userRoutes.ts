import { Router } from 'express';
import { getAllUsers } from '../controllers/userControllers/getUsersController';
import { validateGetAllUsers } from '../validators/userValidators';

const router = Router();

router.get('/users', validateGetAllUsers, getAllUsers);

export default router;
