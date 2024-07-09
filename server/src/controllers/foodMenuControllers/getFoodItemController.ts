import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getCache, setCache } from '../../cache/cache';
import { validationResult } from 'express-validator';
import FoodMenu from '../../models/FoodMenuModel';
import { AuthenticatedRequest } from '../../types/request';

export const getFoodMenuItem = async (
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
		const foodMenuId = req.params.id; // ID of the food menu item being updated

		const menuCategory = req.query.menuCategory as string;

		// Set cache parameters
		const cacheKey = `foodMenu_${foodMenuId}`;
		let foodMenuData = getCache(cacheKey);

		if (foodMenuData) {
			console.log('Returning cached data');
			res.status(StatusCodes.OK).json(foodMenuData);
			return;
		}

		// Fetch all items or handle pagination
		const foodMenuItem = await FoodMenu.findById(foodMenuId).exec();

		if (!foodMenuItem) {
			res.status(StatusCodes.NOT_FOUND).json({
				message: 'Food item not found',
			});
			return;
		}

		console.log('Get Food Menu item: ', foodMenuItem);

		// Cache the fetched data
		setCache(cacheKey, { items: foodMenuItem }, 7200); // Cache for 2 hours

		res.status(StatusCodes.OK).json(foodMenuItem);
	} catch (error: any) {
		console.error('Error getting food menu item:', error);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message:
				error.message ||
				'An error occurred while requesting food menu item',
		});
	}
};
