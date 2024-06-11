import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import FoodMenu from '../../models/FoodMenuModel';
import AuditLog from '../../models/AuditLogModel';
import { clearCache } from '../../cache/cache';
import { ROLE_PERMISSIONS } from '../../constants';
import hasPermission from '../../utils/hasPermission';

interface AuthenticatedRequest extends Request {
	user?: {
		userId: string;
		userStatus: keyof typeof ROLE_PERMISSIONS;
	};
}

export const editFoodMenu = async (
	req: AuthenticatedRequest,
	res: Response
): Promise<void> => {
	try {
		const { menuCategory, pizzaType, name, imageUrl, ingredients, price } =
			req.body;

		// ************** Define params ******************
		const foodMenuId = req.params.id; // ID of the food menu item being updated

		// Validate request body
		if (!menuCategory || !name || !Array.isArray(ingredients) || !price) {
			res.status(StatusCodes.BAD_REQUEST).json({
				message:
					'Invalid request body. Required fields: menuCategory, name, ingredients, price.',
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
		if (!hasPermission(userStatus, 'EDIT_FOOD_ITEM')) {
			res.status(StatusCodes.FORBIDDEN).json({
				message:
					'Forbidden: You do not have permission for this action',
			});
			return;
		}

		// ***** Find the existing food item *******
		const foodItem = await FoodMenu.findById(foodMenuId);
		if (!foodItem) {
			res.status(StatusCodes.NOT_FOUND).json({
				message: 'Food item not found',
			});
			return;
		}

		// *** Update the food item ***
		foodItem.menuCategory = menuCategory;
		foodItem.pizzaType = pizzaType;
		foodItem.name = name;
		foodItem.imageUrl = imageUrl;
		foodItem.ingredients = ingredients;
		foodItem.price = price;

		const updatedFoodItem = await foodItem.save();

		// Log request body for debugging
		console.log('Menu edited:', updatedFoodItem);

		// Create an audit log entry of the user's action
		const auditLog = new AuditLog({
			action: 'EDIT_FOOD_ITEM',
			subjectType: 'FoodMenu',
			subjectId: foodItem._id,
			userId: req.user.userId,
			details: { reason: 'Food item was edited' },
		});
		await auditLog.save();

		const page = parseInt(req.query.page as string, 10) || 1;
		const limit = parseInt(req.query.limit as string, 10) || 10;

		// Clear the cache for the food menu item
		const cacheKey = `foodMenu_page_${page}_limit_${limit}`;
		clearCache(cacheKey);

		res.status(StatusCodes.OK).json({
			message: 'Food menu item updated successfully',
			foodItem: updatedFoodItem,
		});
	} catch (error: any) {
		console.error('Error editing food item:', error);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message:
				error.message ||
				'An error occurred while editing a food menu item',
		});
	}
};
