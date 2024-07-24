import { Response } from 'express';
import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import hasPermission from '../../utils/hasPermission';
import AuditLog from '../../models/AuditLogModel';
import { clearAllCache } from '../../cache/cache';
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
				message: 'You do not have permission to delete menu items',
			});
			return;
		}

		// Get food menu item ID from request params
		const drinkMenuId = req.params.id;

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
			res.status(StatusCodes.NOT_FOUND).json({
				msg: 'Drink item not found',
			});
			return;
		}

		// Audit log and cache clearing
		const auditLog = new AuditLog({
			action: 'DELETE_DRINK_ITEM',
			subjectType: 'DrinkMenu',
			subjectId: deleteDrinkMenuItem._id,
			userId,
			details: { reason: 'A drink menu item was deleted' },
		});
		await auditLog.save();

		// Clear all cache on new item creation
		clearAllCache();

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
