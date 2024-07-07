import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getCache, setCache } from '../../cache/cache';
import { validationResult } from 'express-validator';
import FoodMenu from '../../models/FoodMenuModel';
import { AuthenticatedRequest } from '../../types/request';

export const getFoodMenu = async (
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
		const page = parseInt(req.query.page as string, 10) || 1;
		const limit = parseInt(req.query.limit as string, 10) || 10;
		const skip = (page - 1) * limit;
		const menuCategory = req.query.menuCategory as string;

		// Set cache parameters
		const cacheKey = `foodMenu_${menuCategory}_page_${page}_limit_${limit}`;
		let foodMenuData = getCache(cacheKey);

		if (foodMenuData) {
			console.log('Returning cached data');
			res.status(StatusCodes.OK).json(foodMenuData);
			return;
		}

		// Build query object
		const query: any = {};
		if (menuCategory) {
			query.menuCategory = menuCategory.toUpperCase();
		}

		// Fetch all items or handle pagination
		const allFoodMenuItems = await FoodMenu.find(query)
			.skip(skip)
			.limit(limit)
			.exec();

		const totalItems = await FoodMenu.countDocuments(query).exec();
		const totalPages = Math.ceil(totalItems / limit);

		console.log('Get Food Menu items: ', allFoodMenuItems);

		// Cache the fetched data
		setCache(
			cacheKey,
			{ items: allFoodMenuItems, totalItems, totalPages },
			7200
		); // Cache for 2 hours

		res.status(StatusCodes.OK).json({
			items: allFoodMenuItems,
			totalItems,
			totalPages,
		});
	} catch (error: any) {
		console.error('Error getting food menu items:', error);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message:
				error.message ||
				'An error occurred while requesting food menu items',
		});
	}
};
