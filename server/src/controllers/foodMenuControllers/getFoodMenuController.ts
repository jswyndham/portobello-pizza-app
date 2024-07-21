import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { validationResult } from 'express-validator';
import FoodMenu from '../../models/FoodMenuModel';
import { AuthenticatedRequest } from '../../types/request';
import { getCache, setCache } from '../../cache/cache';

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
		const cacheKey = `foodMenu_page_${page}_limit_${limit}_category_${menuCategory}`;
		const cachedData = getCache(cacheKey);

		if (cachedData) {
			res.status(StatusCodes.OK).json(cachedData);
			return;
		}

		// Create filter based on category
		const filter = menuCategory ? { menuCategory } : {};

		// Fetch all items or handle pagination
		const allFoodMenuItems = await FoodMenu.find(filter)
			.skip(skip)
			.limit(limit)
			.exec();

		const totalItems = await FoodMenu.countDocuments(filter).exec();
		const totalPages = Math.ceil(totalItems / limit);

		const responseData = {
			items: allFoodMenuItems,
			totalItems,
			totalPages,
		};

		// Cache the fetched data
		setCache(cacheKey, responseData, 7200); // Cache for 2 hours

		console.log('Get Food Menu Items: ', allFoodMenuItems);

		res.status(StatusCodes.OK).json(responseData);
	} catch (error: any) {
		console.error('Error getting food menu items:', error);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message:
				error.message ||
				'An error occurred while requesting food menu items',
		});
	}
};
