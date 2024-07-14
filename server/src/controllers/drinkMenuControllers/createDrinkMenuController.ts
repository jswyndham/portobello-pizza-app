import { StatusCodes } from 'http-status-codes';
import { Response } from 'express';
import AuditLog from '../../models/AuditLogModel';
import DrinkMenu from '../../models/DrinkMenuModel';
import { AuthenticatedRequest } from '../../types/request';
import { clearAllCache } from '../../cache/cache';

export const createDrinkMenu = async (
	req: AuthenticatedRequest,
	res: Response
): Promise<void> => {
	const { drinkCategory, name, imageUrl, ingredients, price } = req.body;

	// Validate request body
	if (!drinkCategory || !name || !Array.isArray(ingredients) || !price) {
		res.status(StatusCodes.BAD_REQUEST).json({
			message:
				'Invalid request body. Required fields: drinkCategory, name, ingredients, price.',
		});
		return;
	}

	if (!req.user) {
		res.status(StatusCodes.UNAUTHORIZED).json({
			message: 'User not authenticated',
		});
		return;
	}

	try {
		const drinkItem = await DrinkMenu.create({
			drinkCategory,
			name,
			imageUrl,
			ingredients,
			price,
		});

		// Log request body for debugging
		console.log('Drink item created:', drinkItem);

		// Create an audit log entry of the user's action
		const auditLog = new AuditLog({
			action: 'CREATE_DRINK_ITEM',
			subjectType: 'DrinkMenu',
			subjectId: drinkItem._id,
			userId: req.user.userId,
			details: { reason: 'New drink item created' },
		});
		await auditLog.save();

		// Clear all cache on new item creation
		clearAllCache();

		res.status(StatusCodes.CREATED).json({
			msg: 'New drink item created',
			drinkItem: {
				id: drinkItem._id,
				drinkCategory: drinkItem.drinkCategory,
				name: drinkItem.name,
				imageUrl: drinkItem.imageUrl,
				ingredients: drinkItem.ingredients,
				price: drinkItem.price,
			},
		});
	} catch (error: any) {
		console.error('Error creating drink item:', error);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message:
				error.message ||
				'An error occurred while creating a new drink menu item',
		});
	}
};
