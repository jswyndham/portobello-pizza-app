import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { verifyJWT } from '../../utils/tokenUtils';
import logger from '../../logger';

export const authStatus = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const token =
			req.cookies?.token || req.headers.authorization?.split(' ')[1];

		if (!token) {
			res.status(StatusCodes.UNAUTHORIZED).json({ isLoggedIn: false });
			return;
		}

		const payload = verifyJWT(token);
		if (payload) {
			res.status(StatusCodes.OK).json({
				isLoggedIn: true,
				user: payload,
				token,
			});
			return;
		} else {
			res.status(StatusCodes.UNAUTHORIZED).json({ isLoggedIn: false });
			return;
		}
	} catch (error) {
		logger.error('Error checking authentication status:', error);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: 'Error checking authentication status',
		});
	}
};
