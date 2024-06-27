import { Request, Response } from 'express';
import User from '../../models/UserModel';
import { UnauthenticatedError } from '../../errors/customErrors';
import { comparePassword } from '../../utils/passwordUtils';
import { createJWT } from '../../utils/tokenUtils';
import { setCache } from '../../cache/cache';
import AuditLog from '../../models/AuditLogModel';
import { StatusCodes } from 'http-status-codes';

// Controller for user login and setting authentication cookie
export const loginUser = async (req: Request, res: Response): Promise<void> => {
	try {
		// Define request body
		const { email, password } = req.body;

		// Find the user by email
		const user = await User.findOne({ email });
		if (!user) {
			throw new UnauthenticatedError('User not found');
		}

		// Validate user credentials
		const isValidUser = await comparePassword(password, user.password);
		if (!isValidUser) {
			throw new UnauthenticatedError('Invalid login');
		}

		// Create a JWT for the user
		const token = createJWT({
			userId: user._id.toString(),
			userStatus: user.userStatus,
		});

		// Set authentication cookie
		const oneDay = 1000 * 60 * 60 * 24;
		const isProduction = process.env.NODE_ENV === 'production';
		res.cookie('token', token, {
			httpOnly: true, // prevent client-side script access to the cookie
			expires: new Date(Date.now() + oneDay),
			secure: isProduction, // send the cookie over HTTPS only
			sameSite: isProduction ? 'none' : 'lax', // use 'none' for cross-site requests in production
		});

		// Attempt to cache user data
		try {
			const userData = { ...user.toObject(), password: undefined }; // Exclude password
			const userCacheKey = `user_${user._id}`;
			await setCache(userCacheKey, userData, 3600);
		} catch (cacheError) {
			console.error('Failed to cache user data:', cacheError);
			// Continue without caching if an error occurs
		}

		// Audit log for user login
		const auditLog = new AuditLog({
			action: 'LOGIN',
			subjectType: 'User',
			subjectId: user._id,
			userId: user._id,
			details: { reason: 'User logged in' },
		});
		await auditLog.save();

		console.log('User logged in:', user);

		res.status(StatusCodes.OK).json({
			msg: 'User is logged in',
			user: {
				id: user._id,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				userStatus: user.userStatus,
			},
			token,
		});
	} catch (error: any) {
		console.error('Error signing in user:', error);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message:
				error.message || 'An error occurred while signing in the user',
		});
	}
};
