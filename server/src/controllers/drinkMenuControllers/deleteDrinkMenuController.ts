import { Response } from 'express';
import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import hasPermission from '../../utils/hasPermission';
import AuditLog from '../../models/AuditLogModel';
import { clearCache } from '../../cache/cache';
import DrinkMenu from '../../models/DrinkMenuModel';
import { AuthenticatedRequest } from '../../types/request';

export const deleteDrinkMenu = async (
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
		if (!hasPermission(userStatus, 'DELETE_DRINK_ITEM')) {
			res.status(StatusCodes.FORBIDDEN).json({
				message:
					'Forbidden: You do not have permission for this action',
			});
			return;
		}

		// Get food menu item ID from request params
		const drinkMenuId = req.params.id;
		console.log(`Drink menu ID received: ${drinkMenuId}`);

		// Validate the ID format
		if (!mongoose.Types.ObjectId.isValid(drinkMenuId)) {
			res.status(StatusCodes.BAD_REQUEST).json({
				message: 'Invalid drink menu ID format',
			});
			return;
		}

		// Find the food menu item by ID and delete
		const deleteDrinkMenuItem = await DrinkMenu.findByIdAndDelete(
			drinkMenuId
		);
		if (!deleteDrinkMenuItem) {
			console.log(`Drink item not found for ID: ${drinkMenuId}`);
			res.status(StatusCodes.NOT_FOUND).json({
				msg: 'Drink item not found',
			});
			return;
		}

		// Log request body for debugging
		console.log('Drink deleted:', deleteDrinkMenuItem);

		// Audit log and cache clearing
		const auditLog = new AuditLog({
			action: 'DELETE_DRINK_ITEM',
			subjectType: 'DrinkMenu',
			subjectId: deleteDrinkMenuItem._id,
			userId,
			details: { reason: 'Drink menu item deleted' },
		});
		await auditLog.save();

		const page = parseInt(req.query.page as string, 10) || 1;
		const limit = parseInt(req.query.limit as string, 10) || 10;

		// Clear the cache for the drink menu item
		const cacheKey = `drinkMenu_page_${page}_limit_${limit}`;
		clearCache(cacheKey);

		res.status(StatusCodes.OK).json({
			msg: 'Drink menu item deleted',
			drinkItemId: deleteDrinkMenuItem._id,
		});
	} catch (error: any) {
		console.error('Error deleting drink menu item:', error);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message:
				error.message ||
				'An error occurred while deleting a drink menu item',
		});
	}
};
