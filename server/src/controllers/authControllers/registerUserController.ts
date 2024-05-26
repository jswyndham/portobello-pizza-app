import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import User from '../../models/UserModel';
import AuditLog from '../../models/AuditLogModel';
import { ADMIN_STATUS, USER_STATUS } from '../../utils/constants';
import { hashPassword } from '../../utils/passwordUtils';
import { body, validationResult } from 'express-validator';

interface RegisterUserRequest {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	userStatus?: string;
}

// Validation rules
// export const validateRegisterUser = [
// 	body('firstName')
// 		.isString()
// 		.notEmpty()
// 		.withMessage('First name is required'),
// 	body('lastName').isString().notEmpty().withMessage('Last name is required'),
// 	body('email').isEmail().withMessage('Valid email is required'),
// 	body('password')
// 		.isString()
// 		.isLength({ min: 6 })
// 		.withMessage('Password must be at least 6 characters long'),
// 	body('userStatus').optional().isString(),
// ];

export const registerUser = async (
	req: Request,
	res: Response
): Promise<void> => {
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
		let role = userStatus || USER_STATUS.STAFF_MEMBER.value;
		let adminRole: string[] = [];

		if (isFirstAccount) {
			role = USER_STATUS.ADMIN.value;
			adminRole.push(ADMIN_STATUS.SUPER_ADMIN.value);
		}

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
