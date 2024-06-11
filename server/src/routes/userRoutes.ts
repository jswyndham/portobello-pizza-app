import { Router } from 'express';
import {
	getAllUsers,
	editUser,
	deleteUser,
} from '../controllers/userControllers';
import { validateGetAllUsers } from '../validators/userValidators';
import { validateRegisterUser } from '../validators/authValidators';
import { authenticateUser } from '../middleware/authMiddleware';

const router = Router();

router.route('/').get(authenticateUser, validateGetAllUsers, getAllUsers);

router
	.route('/:id')
	.patch(authenticateUser, validateRegisterUser, editUser)
	.delete(authenticateUser, deleteUser);

export default router;
