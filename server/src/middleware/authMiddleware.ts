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
	// Get the token from the cookie
	let token = req.cookies?.token;

	// If token is not found in cookie, check the authorization header
	if (!token) {
		token = req.headers.authorization?.split(' ')[1];
	}

	// If no token is found in either place, throw an error
	if (!token) {
		throw new UnauthenticatedError('Authentication invalid');
	}

	try {
		// Verify the token and attach the user info to the request
		const payload = verifyJWT(token);
		const { userId, userStatus } = payload;
		req.user = { userId, userStatus };

		console.log('Authenticated user:', req.user);
		next();
	} catch (error: any) {
		throw new UnauthenticatedError('Authentication invalid');
	}
};
