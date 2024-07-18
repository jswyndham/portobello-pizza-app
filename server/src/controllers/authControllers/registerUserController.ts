import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import User from '../../models/UserModel';
import AuditLog from '../../models/AuditLogModel';
import { USER_STATUS } from '../../constants';
import { hashPassword } from '../../utils/passwordUtils';
import { validationResult } from 'express-validator';
import { clearAllCache } from '../../cache/cache';

export const registerUser = async (
	req: Request,
	res: Response
): Promise<void> => {
	// Log request body for debugging
	console.log('Request Body:', req.body);

	// Validate the request body
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
		return;
	}

	try {
		// Define the request body
		const { firstName, lastName, email, password, userStatus } = req.body;

		// Encrypt user password
		const hashedPassword = await hashPassword(password);

		// Check if this is the first account to automatically assign super admin status
		const isFirstAccount = (await User.countDocuments()) === 0;

		// Determine the user role
		let role = userStatus || USER_STATUS.MANAGER;

		if (isFirstAccount) {
			role = USER_STATUS.ADMIN;
		} else {
			role = USER_STATUS.MANAGER;
		}

		// Log request body for debugging
		console.log(
			'Request Body:',
			firstName,
			lastName,
			email,
			password,
			userStatus
		);

		// Create the user
		const user = await User.create({
			firstName,
			lastName,
			email,
			password: hashedPassword,
			userStatus: role,
		});

		// Create an audit log entry of the user's action
		const auditLog = new AuditLog({
			action: 'REGISTER',
			subjectType: 'User',
			subjectId: user._id,
			userId: user._id,
			details: { reason: 'User registered' },
		});
		await auditLog.save();

		// Clear cache after user registration
		clearAllCache();

		res.status(StatusCodes.CREATED).json({
			msg: 'User registered',
			user: {
				id: user._id,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				userStatus: user.userStatus,
			},
		});
	} catch (error: any) {
		console.error('Error registering user:', error);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message:
				error.message || 'An error occurred while registering the user',
		});
	}
};
