import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import AuditLog from '../../models/AuditLogModel';
import { clearCache } from '../../cache/cache';
import { ROLE_PERMISSIONS } from '../../constants';
import hasPermission from '../../utils/hasPermission';
import User from '../../models/UserModel';

interface AuthenticatedRequest extends Request {
	user?: {
		userId: string;
		userStatus: keyof typeof ROLE_PERMISSIONS;
	};
}

export const editUser = async (
	req: AuthenticatedRequest,
	res: Response
): Promise<void> => {
	try {
		const { firstName, lastName, email, password } = req.body;

		// Get user ID from request params
		const userIdToEdit = req.params.id;

		// Validate request body
		if (!firstName || !lastName || !email || !password) {
			res.status(StatusCodes.BAD_REQUEST).json({
				message:
					'Invalid request body. Required fields: firstName, lastName, email, password.',
			});
			return;
		}

		if (!req.user) {
			res.status(StatusCodes.UNAUTHORIZED).json({
				message: 'User not authenticated',
			});
			return;
		}

		const { userStatus } = req.user;
		if (!hasPermission(userStatus, 'EDIT_USER')) {
			res.status(StatusCodes.FORBIDDEN).json({
				message:
					'Forbidden: You do not have permission for this action',
			});
			return;
		}

		// Find the existing user
		const user = await User.findById(userIdToEdit);
		if (!user) {
			res.status(StatusCodes.NOT_FOUND).json({
				message: 'User not found',
			});
			return;
		}

		// Update user details
		user.firstName = firstName;
		user.lastName = lastName;
		user.email = email;
		user.password = password;

		const updatedUser = await user.save();

		// Log request body for debugging
		console.log('User details edited:', updatedUser);

		// Create an audit log entry of the user's action
		const auditLog = new AuditLog({
			action: 'EDIT_USER',
			subjectType: 'User Profile',
			subjectId: user._id,
			userId: req.user.userId,
			details: { reason: 'User details were edited' },
		});
		await auditLog.save();

		// Clear the cache for the user data
		const cacheKey = `user_${userIdToEdit}`;
		clearCache(cacheKey);

		res.status(StatusCodes.OK).json({
			message: 'User details updated successfully',
			user: updatedUser,
		});
	} catch (error: any) {
		console.error('Error editing user:', error);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message:
				error.message || 'An error occurred while editing user details',
		});
	}
};
