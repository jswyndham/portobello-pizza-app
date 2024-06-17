import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getCache, setCache } from '../../cache/cache';
import { validationResult } from 'express-validator';
import DrinkMenu from '../../models/DrinkMenuModel';

interface AuthenticatedRequest extends Request {
	user?: {
		userId: string;
		userStatus: string;
	};
}

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

	// Validate user authentication
	if (!req.user) {
		res.status(StatusCodes.UNAUTHORIZED).json({
			message: 'User not authenticated',
		});
		return;
	}

	try {
		const page = parseInt(req.query.page as string, 10) || 1;
		const limit = parseInt(req.query.limit as string, 10) || 10;
		const skip = (page - 1) * limit;

		// Set cache parameters
		const cacheKey = `drinkMenu_page_${page}_limit_${limit}`;
		let drinkMenuData = getCache(cacheKey);

		if (drinkMenuData) {
			console.log('Returning cached data');
			res.status(StatusCodes.OK).json(drinkMenuData);
			return;
		}

		// Fetch from DB if not cached
		const allDrinkMenuItems = await DrinkMenu.find({})
			.skip(skip)
			.limit(limit)
			.exec();

		console.log('Get Food Menu items: ', allDrinkMenuItems);

		// Cache the fetched data
		setCache(cacheKey, allDrinkMenuItems, 7200); // Cache for 2 hours

		res.status(StatusCodes.OK).json(allDrinkMenuItems);
	} catch (error: any) {
		console.error('Error getting food menu items:', error);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message:
				error.message ||
				'An error occurred while requesting food menu items',
		});
	}
};
