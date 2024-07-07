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

	// Extract token from cookies or authorization header
	const token =
		req.cookies?.token || (authHeader ? authHeader.split(' ')[1] : null);

	// Log the extracted token for debugging
	console.log('Extracted Token:', token);

	if (!token) {
		console.error('Authentication token missing');
		res.status(401).json({ message: 'Authentication invalid - token' });
		return;
	}

	try {
		// Verify the token and log the payload
		const payload = verifyJWT(token);
		console.log('Token payload:', payload);

		if (!payload) {
			console.error('Invalid token');
			res.status(401).json({
				message: 'Authentication invalid - payload',
			});
			return;
		}

		// Type assertion to AuthenticatedRequest and set user information
		(req as AuthenticatedRequest).user = {
			userId: payload.userId,
			userStatus: payload.userStatus as USER_STATUS,
		};

		console.log('Authenticated user:', (req as AuthenticatedRequest).user);
		next();
	} catch (error: any) {
		console.error('Error during authentication:', error);
		res.status(401).json({ message: 'Authentication invalid - catch' });
	}
};
