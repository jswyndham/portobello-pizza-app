import { NextFunction, Request, Response } from 'express';
import { UnauthenticatedError } from '../errors/customErrors';
import { verifyJWT } from '../utils/tokenUtils';

interface AuthenticatedRequest extends Request {
	user?: {
		userId: string;
		userStatus: string;
	};
}

export const authenticateUser = (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
): void => {
	let token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

	if (!token) {
		console.error('Authentication token missing');
		throw new UnauthenticatedError('Authentication invalid');
	}

	try {
		const payload = verifyJWT(token);
		if (!payload) {
			console.error('Invalid token');
			throw new UnauthenticatedError('Authentication invalid');
		}
		req.user = { userId: payload.userId, userStatus: payload.userStatus };

		console.log('Authenticated user:', req.user);
		next();
	} catch (error: any) {
		console.error('Error during authentication:', error);
		throw new UnauthenticatedError('Authentication invalid');
	}
};
