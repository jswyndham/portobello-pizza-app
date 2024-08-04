import { NextFunction, Request, Response } from 'express';
import { verifyJWT } from '../utils/tokenUtils';
import { AuthenticatedRequest } from '../types/request';
import { USER_STATUS } from '../constants/userStatus';

export const authenticateUser = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	console.log('Request Headers:', req.headers); // Log the headers for debugging
	const authHeader = req.headers.authorization;
	console.log('Auth Header:', authHeader); // Log the authorization header

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		console.error('Authentication token missing or malformed');
		res.status(401).json({
			message: 'Authentication invalid - token missing or malformed',
		});
		return;
	}

	const token = authHeader.split(' ')[1];
	console.log('Token:', token); // Log the token

	try {
		const payload = verifyJWT(token);
		console.log('Token Payload:', payload); // Log the payload for debugging

		if (!payload) {
			console.error('Invalid token payload');
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
		console.error('Error during authentication:', error);
		res.status(401).json({ message: 'Authentication invalid - catch' });
	}
};
