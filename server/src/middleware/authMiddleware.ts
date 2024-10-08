import { NextFunction, Request, Response } from 'express';
import { verifyJWT } from '../utils/tokenUtils';
import { AuthenticatedRequest } from '../types/request';
import { USER_STATUS } from '../constants/userStatus';

export const authenticateUser = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		res.status(401).json({
			message: 'Authentication invalid - token missing or malformed',
		});
		return;
	}

	const token = authHeader.split(' ')[1];

	try {
		const payload = verifyJWT(token);

		if (!payload) {
			res.status(401).json({
				message: 'Authentication invalid - payload',
			});
			return;
		}

		(req as AuthenticatedRequest).user = {
			userId: payload.userId,
			userStatus: payload.userStatus as USER_STATUS,
		};

		next();
	} catch (error: any) {
		res.status(401).json({ message: 'Authentication invalid - catch' });
	}
};
