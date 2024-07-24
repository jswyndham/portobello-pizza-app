import { StatusCodes } from 'http-status-codes';
import { Response } from 'express';
import AuditLog from '../../models/AuditLogModel';
import { clearCache } from '../../cache/cache';
import hasPermission from '../../utils/hasPermission';
import User from '../../models/UserModel';
import { hashPassword } from '../../utils/passwordUtils';
import { AuthenticatedRequest } from '../../types/request';

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

		// Ensure the authenticated user is present
		if (!req.user) {
			res.status(StatusCodes.UNAUTHORIZED).json({
				message: 'User not authenticated',
			});
			return;
		}

		// Ensure user has the permission to edit other user's details
		const { userStatus } = req.user;
		if (!hasPermission(userStatus, 'EDIT_USER')) {
			res.status(StatusCodes.FORBIDDEN).json({
				message:
					'Forbidden: You do not have permission for this action',
			});
			return;
		}

		// Find the existing user on the database
		const user = await User.findById(userIdToEdit);
		if (!user) {
			res.status(StatusCodes.NOT_FOUND).json({
				message: 'User not found',
			});
			return;
		}

		// Update user details if provided
		if (firstName) user.firstName = firstName;
		if (lastName) user.lastName = lastName;
		if (email) user.email = email;
		if (password) {
			// Hash the new password before saving
			user.password = await hashPassword(password);
		}
		const updatedUser = await user.save();

		// Create an audit log entry of the user's action
		const auditLog = new AuditLog({
			action: 'EDIT_USER',
			subjectType: 'User Profile',
			subjectId: user._id,
			userId: req.user.userId,
			details: { reason: 'A user details were edited' },
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
