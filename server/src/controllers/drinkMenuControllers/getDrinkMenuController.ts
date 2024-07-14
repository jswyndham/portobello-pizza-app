import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getCache, setCache } from '../../cache/cache';
import { validationResult } from 'express-validator';
import DrinkMenu from '../../models/DrinkMenuModel';
import { AuthenticatedRequest } from '../../types/request';

export const getDrinkMenu = async (
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

		const drinkCategory = req.query.drinkCategory as string;

		// Set cache parameters including drinkCategory
		const cacheKey = `drinkMenu_page_${page}_limit_${limit}_category_${drinkCategory}`;
		const cachedData = getCache(cacheKey);

		if (cachedData) {
			res.status(StatusCodes.OK).json(cachedData);
			return;
		}

		// Create filter based on category
		const filter = drinkCategory ? { drinkCategory } : {};

		// Fetch from DB if not cached
		const allDrinkMenuItems = await DrinkMenu.find(filter)
			.skip(skip)
			.limit(limit)
			.exec();

		const totalItems = await DrinkMenu.countDocuments(filter).exec();
		const totalPages = Math.ceil(totalItems / limit);

		const responseData = {
			items: allDrinkMenuItems,
			totalItems,
			totalPages,
		};

		// Cache the fetched data
		setCache(cacheKey, responseData, 7200); // Cache for 2 hours

		console.log('Get Drink Menu Items: ', allDrinkMenuItems);

		res.status(StatusCodes.OK).json(responseData);
	} catch (error: any) {
		console.error('Error getting drink menu items:', error);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message:
				error.message ||
				'An error occurred while requesting drink menu items',
		});
	}
};
