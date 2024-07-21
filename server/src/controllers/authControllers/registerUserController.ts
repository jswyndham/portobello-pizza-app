import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import User from '../../models/UserModel';
import AuditLog from '../../models/AuditLogModel';
import { USER_STATUS } from '../../constants';
import { hashPassword } from '../../utils/passwordUtils';
import { validationResult } from 'express-validator';
import { clearAllCache } from '../../cache/cache';
import { AuthenticatedRequest } from '../../types/request';

export const registerUser = async (
	req: AuthenticatedRequest,
	res: Response
): Promise<void> => {
	console.log('Request Body:', req.body);

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
		return;
	}

	try {
		const { firstName, lastName, email, password, userStatus } = req.body;
		const hashedPassword = await hashPassword(password);
		const isFirstAccount = (await User.countDocuments()) === 0;
		let role = userStatus || USER_STATUS.MANAGER;

		if (isFirstAccount) {
			role = USER_STATUS.ADMIN;
		} else {
			role = USER_STATUS.MANAGER;
		}

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			res.status(StatusCodes.CONFLICT).json({
				message: 'User with this email already exists',
			});
			return;
		}

		const user = await User.create({
			firstName,
			lastName,
			email,
			password: hashedPassword,
			userStatus: role,
		});

		const auditLog = new AuditLog({
			action: 'REGISTER',
			subjectType: 'User',
			subjectId: user._id,
			userId: req.user?.userId || user._id,
			details: {
				reason: 'A new user registered',

				user: {
					firstName: user.firstName,
					lastName: user.lastName,
					email: user.email,
					userStatus: user.userStatus,
				},
			},
		});
		await auditLog.save();

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
