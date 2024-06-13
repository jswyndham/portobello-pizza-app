import { Request, Response } from 'express';
import User from '../../models/UserModel';
import { StatusCodes } from 'http-status-codes';
import { getCache, setCache } from '../../cache/cache';
import { validationResult } from 'express-validator';

export const getAllUsers = async (
	req: Request,
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

		// Set cache parameters
		const cacheKey = `all_users_page_${page}_limit_${limit}`;
		let userData = getCache(cacheKey);

		if (userData) {
			console.log('Returning cached data');
			res.status(StatusCodes.OK).json(userData);
			return;
		}

		// Fetch from DB if not cached
		const allUsers = await User.find(
			{},
			'firstName lastName email userStatus lastLogin'
		)
			.skip(skip)
			.limit(limit)
			.exec();

		// Cache the fetched data
		setCache(cacheKey, allUsers, 7200); // Cache for 2 hours

		res.status(StatusCodes.OK).json(allUsers);
	} catch (error: any) {
		console.error('Error fetching users:', error);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message:
				error.message || 'An error occurred while requesting users',
		});
	}
};
