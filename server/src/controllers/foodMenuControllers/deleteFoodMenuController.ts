import { Response } from 'express';
import FoodMenu from '../../models/FoodMenuModel';
import { StatusCodes } from 'http-status-codes';
import hasPermission from '../../utils/hasPermission';
import AuditLog from '../../models/AuditLogModel';
import { AuthenticatedRequest } from '../../types/request';
import { clearAllCache } from '../../cache/cache';
import mongoose from 'mongoose';
import logger from '../../logger';

export const deleteFoodMenu = async (
	req: AuthenticatedRequest,
	res: Response
): Promise<void> => {
	try {
		if (!req.user) {
			res.status(StatusCodes.UNAUTHORIZED).json({
				message: 'User not authenticated',
			});
			return;
		}

		const { userId, userStatus } = req.user;
		if (!hasPermission(userStatus, 'DELETE_FOOD_ITEM')) {
			res.status(StatusCodes.FORBIDDEN).json({
				message: 'You do not have permission to delete menu items',
			});
			return;
		}

		// Get food menu item ID from request params
		const foodMenuId = req.params.id;

		if (!mongoose.Types.ObjectId.isValid(foodMenuId)) {
			res.status(StatusCodes.BAD_REQUEST).json({
				message: 'Invalid menu item ID',
			});
			return;
		}

		// Find the food menu item by ID
		const foodMenuItem = await FoodMenu.findById(foodMenuId);
		if (!foodMenuItem) {
			res.status(StatusCodes.NOT_FOUND).json({
				msg: 'Menu item not found',
			});
			return;
		}

		// Capture the details of the item before deletion
		const itemDetails = {
			menuCategory: foodMenuItem.menuCategory,
			pizzaType: foodMenuItem.pizzaType,
			name: foodMenuItem.name,
			ingredients: foodMenuItem.ingredients,
			price: foodMenuItem.price,
			imageUrl: foodMenuItem.imageUrl,
		};

		// Delete the food menu item
		await foodMenuItem.deleteOne();

		// Audit log and cache clearing
		const auditLog = new AuditLog({
			action: 'DELETE_FOOD_ITEM',
			subjectType: 'FoodMenu',
			subjectId: foodMenuItem._id,
			userId,
			details: {
				reason: 'A food menu item was deleted',
				foodItem: itemDetails,
			},
		});
		await auditLog.save();

		// Clear all cache on new item creation
		clearAllCache();

		res.status(StatusCodes.OK).json({
			msg: 'Food menu item deleted',
			foodItemId: foodMenuItem._id,
		});
	} catch (error: any) {
		logger.error('Error deleting food menu item:', error);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message:
				error.message ||
				'An error occurred while deleting a food menu item',
		});
	}
};
