import { StatusCodes } from 'http-status-codes';
import { Response } from 'express';
import FoodMenu from '../../models/FoodMenuModel';
import AuditLog from '../../models/AuditLogModel';
import { AuthenticatedRequest } from '../../types/request';
import { clearAllCache } from '../../cache/cache';
import hasPermission from '../../utils/hasPermission';

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

	if (!req.user) {
		res.status(StatusCodes.UNAUTHORIZED).json({
			message: 'User not authenticated',
		});
		return;
	}

	const { userId, userStatus } = req.user;
	if (!hasPermission(userStatus, 'CREATE_FOOD_ITEM')) {
		res.status(StatusCodes.FORBIDDEN).json({
			message: 'Forbidden: You do not have permission for this action',
		});
		return;
	}

	try {
		// Ingredients is parsed as an array to match the model
		const parsedIngredients = Array.isArray(ingredients)
			? ingredients
			: JSON.parse(ingredients);

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
			userId: authReq.user!.userId,
			details: {
				reason: 'A new food item was created',
				foodItem: {
					menuCategory,
					pizzaType,
					name,
					ingredients: parsedIngredients,
					price,
					imageUrl,
				},
			},
		});
		await auditLog.save();

		// Clear all cache on new item creation
		clearAllCache();

		console.log('Create food menu item: ', foodItem);

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
