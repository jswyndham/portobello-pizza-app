import { Response } from 'express';
import FoodMenu from '../../models/FoodMenuModel';
import { StatusCodes } from 'http-status-codes';
import hasPermission from '../../utils/hasPermission';
import AuditLog from '../../models/AuditLogModel';
import { clearCache } from '../../cache/cache';
import { AuthenticatedRequest } from '../../types/request';

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
				message:
					'Forbidden: You do not have permission for this action',
			});
			return;
		}

		// Get food menu item ID from request params
		const foodMenuId = req.params.id;

		// Find the food menu item by ID and delete
		const deleteFoodMenuItem = await FoodMenu.findByIdAndDelete(foodMenuId);
		if (!deleteFoodMenuItem) {
			res.status(StatusCodes.NOT_FOUND).json({
				msg: 'Menu item not found',
			});
			return;
		}

		// Log request body for debugging
		console.log('Menu deleted:', deleteFoodMenuItem);

		// Audit log and cache clearing
		const auditLog = new AuditLog({
			action: 'DELETE_FOOD_ITEM',
			subjectType: 'FoodMenu',
			subjectId: deleteFoodMenuItem._id,
			userId,
			details: { reason: 'Food menu item deleted' },
		});
		await auditLog.save();

		const page = parseInt(req.query.page as string, 10) || 1;
		const limit = parseInt(req.query.limit as string, 10) || 10;

		// Clear the cache for the food menu item
		const cacheKey = `foodMenu_page_${page}_limit_${limit}`;
		clearCache(cacheKey);

		res.status(StatusCodes.OK).json({
			msg: 'Food menu item deleted',
			foodItemId: deleteFoodMenuItem._id,
		});
	} catch (error: any) {
		console.error('Error deleting quiz:', error);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message:
				error.message ||
				'An error occurred while deleting a food menu item',
		});
	}
};
