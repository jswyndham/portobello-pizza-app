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

	console.log('authHeader:', authHeader); // Log the auth header

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		console.log('Authentication header missing or malformed'); // Add logging
		res.status(401).json({
			message: 'Authentication invalid - token missing or malformed',
		});
		return;
	}

	const token = authHeader.split(' ')[1];
	console.log('Token:', token); // Log the token

	try {
		const payload = verifyJWT(token);
		console.log('Token payload:', payload); // Add logging

		if (!payload) {
			console.log('Invalid payload'); // Add logging
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
		console.log('Authentication error:', error); // Add logging
		res.status(401).json({ message: 'Authentication invalid - catch' });
	}
};
