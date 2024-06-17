import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import AuditLog from '../../models/AuditLogModel';
import DrinkMenu from '../../models/DrinkMenuModel';

interface AuthenticatedRequest extends Request {
	user?: {
		userId: string;
		userStatus: string;
	};
}

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
		console.log('Menu created:', drinkItem);

		// Create an audit log entry of the user's action
		const auditLog = new AuditLog({
			action: 'CREATE_DRINK_ITEM',
			subjectType: 'DrinkMenu',
			subjectId: drinkItem._id,
			userId: req.user.userId,
			details: { reason: 'New drink item created' },
		});
		await auditLog.save();

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
