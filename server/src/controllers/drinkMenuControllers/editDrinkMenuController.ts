import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import AuditLog from '../../models/AuditLogModel';
import { clearCache } from '../../cache/cache';
import { ROLE_PERMISSIONS } from '../../constants';
import hasPermission from '../../utils/hasPermission';
import DrinkMenu from '../../models/DrinkMenuModel';

interface AuthenticatedRequest extends Request {
	user?: {
		userId: string;
		userStatus: keyof typeof ROLE_PERMISSIONS;
	};
}

export const editDrinkMenu = async (
	req: AuthenticatedRequest,
	res: Response
): Promise<void> => {
	try {
		const { drinkCategory, name, imageUrl, ingredients, price } = req.body;

		// ************** Define params ******************
		const drinkMenuId = req.params.id; // ID of the drink menu item being updated

		// Validate request body
		if (!drinkCategory || !name || !price) {
			res.status(StatusCodes.BAD_REQUEST).json({
				message:
					'Invalid request body. Required fields: menuCategory, name, price.',
			});
			return;
		}

		if (!req.user) {
			res.status(StatusCodes.UNAUTHORIZED).json({
				message: 'User not authenticated',
			});
			return;
		}

		const { userId, userStatus } = req.user;
		if (!hasPermission(userStatus, 'EDIT_DRINK_ITEM')) {
			res.status(StatusCodes.FORBIDDEN).json({
				message:
					'Forbidden: You do not have permission for this action',
			});
			return;
		}

		// ***** Find the existing drink item *******
		const drinkItem = await DrinkMenu.findById(drinkMenuId);
		if (!drinkItem) {
			res.status(StatusCodes.NOT_FOUND).json({
				message: 'Drink item not found',
			});
			return;
		}

		// *** Update the drink item ***
		drinkItem.drinkCategory = drinkCategory;
		drinkItem.name = name;
		drinkItem.imageUrl = imageUrl;
		drinkItem.ingredients = ingredients;
		drinkItem.price = price;

		const updatedDrinkItem = await drinkItem.save();

		// Log request body for debugging
		console.log('Menu edited:', updatedDrinkItem);

		// Create an audit log entry of the user's action
		const auditLog = new AuditLog({
			action: 'EDIT_DRINK_ITEM',
			subjectType: 'DrinkMenu',
			subjectId: drinkItem._id,
			userId: req.user.userId,
			details: { reason: 'Drink item was edited' },
		});
		await auditLog.save();

		const page = parseInt(req.query.page as string, 10) || 1;
		const limit = parseInt(req.query.limit as string, 10) || 10;

		// Clear the cache for the drink menu item
		const cacheKey = `drinkMenu_page_${page}_limit_${limit}`;
		clearCache(cacheKey);

		res.status(StatusCodes.OK).json({
			message: 'Drink menu item updated successfully',
			drinkItem: updatedDrinkItem,
		});
	} catch (error: any) {
		console.error('Error editing drink item:', error);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message:
				error.message ||
				'An error occurred while editing a drink menu item',
		});
	}
};
