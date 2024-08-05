import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getCache, setCache } from '../../cache/cache';
import { validationResult } from 'express-validator';
import DrinkMenu from '../../models/DrinkMenuModel';
import { AuthenticatedRequest } from '../../types/request';
import logger from '../../logger';

export const getDrinkMenuItem = async (
	req: AuthenticatedRequest,
	res: Response
): Promise<void> => {
	// Validate the request
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
		return;
	}

	try {
		// ************** Define params ******************
		const drinkMenuId = req.params.id; // ID of the drink menu item being updated

		const menuCategory = req.query.menuCategory as string;

		// Set cache parameters
		const cacheKey = `drinkMenu_${drinkMenuId}`;
		let drinkMenuData = getCache(cacheKey);

		if (drinkMenuData) {
			res.status(StatusCodes.OK).json(drinkMenuData);
			return;
		}

		// Fetch all items or handle pagination
		const drinkMenuItem = await DrinkMenu.findById(drinkMenuId).exec();

		if (!drinkMenuItem) {
			res.status(StatusCodes.NOT_FOUND).json({
				message: 'drink item not found',
			});
			return;
		}

		// Cache the fetched data
		setCache(cacheKey, { items: drinkMenuItem }, 7200); // Cache for 2 hours

		res.status(StatusCodes.OK).json({ drinkMenuItem });
	} catch (error: any) {
		logger.error('Error getting drink menu item:', error);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message:
				error.message ||
				'An error occurred while requesting drink menu item',
		});
	}
};
