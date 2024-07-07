import { StatusCodes } from 'http-status-codes';
import { Response } from 'express';
import FoodMenu from '../../models/FoodMenuModel';
import AuditLog from '../../models/AuditLogModel';
import { AuthenticatedRequest } from '../../types/request';
import multer from 'multer';

const upload = multer(); // Multer configuration

export const createFoodMenu = async (
	req: AuthenticatedRequest,
	res: Response
): Promise<void> => {
	console.log('Received request body:', req.body);

	const { menuCategory, pizzaType, name, ingredients, price, imageUrl } =
		req.body;

	if (!menuCategory || !name || !ingredients || !price) {
		res.status(StatusCodes.BAD_REQUEST).json({
			message:
				'Invalid request body. Required fields: menuCategory, name, ingredients, price.',
		});
		console.log('Request body:', req.body);
		return;
	}

	const authReq = req as AuthenticatedRequest;

	if (!authReq.user) {
		res.status(StatusCodes.UNAUTHORIZED).json({
			message: 'User not authenticated',
		});
		return;
	}

	try {
		const parsedIngredients = JSON.parse(ingredients);

		const foodItem = await FoodMenu.create({
			menuCategory,
			pizzaType,
			name,
			imageUrl,
			ingredients: parsedIngredients,
			price,
		});

		const auditLog = new AuditLog({
			action: 'CREATE_FOOD_ITEM',
			subjectType: 'FoodMenu',
			subjectId: foodItem._id,
			userId: authReq.user.userId,
			details: { reason: 'New food item created' },
		});
		await auditLog.save();

		res.status(StatusCodes.CREATED).json({
			msg: 'New food item created',
			foodItem,
		});
	} catch (error) {
		console.error('Error creating food item:', error);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message:
				(error as Error).message ||
				'An error occurred while creating a new food menu item',
		});
	}
};
