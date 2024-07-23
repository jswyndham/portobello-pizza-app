import { Response } from 'express';
import User from '../../models/UserModel';
import { StatusCodes } from 'http-status-codes';
import { getCache, setCache } from '../../cache/cache';
import { validationResult } from 'express-validator';
import hasPermission from '../../utils/hasPermission';
import { USER_STATUS } from '../../constants';
import { AuthenticatedRequest } from '../../types/request';

export const getAllUsers = async (
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
		const page = parseInt(req.query.page as string, 30) || 1;
		const limit = parseInt(req.query.limit as string, 30) || 30;
		const skip = (page - 1) * limit;

		// Set cache parameters
		const cacheKey = `all_users_page_${page}_limit_${limit}`;
		let userData = getCache(cacheKey);

		// Check user authorization
		if (!req.user) {
			res.status(StatusCodes.UNAUTHORIZED).json({
				message: 'User not authenticated',
			});
			return;
		}

		const { userStatus } = req.user;

		// Check for permissions
		if (!hasPermission(userStatus as USER_STATUS, 'GET_MEMBERS')) {
			res.status(StatusCodes.FORBIDDEN).json({
				message:
					'Forbidden: You do not have permission for this action',
			});
			return;
		}

		if (userData) {
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
		console.log('get all member users: ', allUsers);

		res.status(StatusCodes.OK).json(allUsers);
	} catch (error: any) {
		console.error('Error fetching users:', error);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message:
				error.message || 'An error occurred while requesting users',
		});
	}
};
