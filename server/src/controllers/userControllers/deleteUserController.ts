import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import hasPermission from '../../utils/hasPermission';
import AuditLog from '../../models/AuditLogModel';
import { clearAllCache, clearCache } from '../../cache/cache';
import User from '../../models/UserModel';
import { AuthenticatedRequest } from '../../types/request';
import logger from '../../logger';

export const deleteUser = async (
	req: AuthenticatedRequest,
	res: Response
): Promise<void> => {
	try {
		if (!req.user) {
			res.status(StatusCodes.UNAUTHORIZED).json({
				message: 'User not authenticated',
			});
			return;
		}

		// User permissions
		const { userStatus } = req.user;
		if (!hasPermission(userStatus, 'DELETE_USER')) {
			res.status(StatusCodes.FORBIDDEN).json({
				message:
					'Forbidden: You do not have permission for this action',
			});
			return;
		}

		// Get user ID from request params
		const userIdToDelete = req.params.id;

		// Error handling: User not found
		const user = await User.findById(userIdToDelete);
		if (!user) {
			res.status(StatusCodes.NOT_FOUND).json({
				message: 'User not found',
			});
			return;
		}

		// Cannot delete an ADMIN
		if (user.userStatus === 'ADMIN') {
			res.status(StatusCodes.FORBIDDEN).json({
				message: 'Forbidden: Cannot delete ADMIN user',
			});
			return;
		}

		// Find the user by ID and delete
		const deletedUser = await User.findByIdAndDelete(userIdToDelete);
		if (!deletedUser) {
			res.status(StatusCodes.NOT_FOUND).json({
				message: 'User not found',
			});
			return;
		}

		// Audit log and cache clearing
		const auditLog = new AuditLog({
			action: 'DELETE_USER',
			subjectType: 'User Profile',
			subjectId: deletedUser._id,
			userId: req.user.userId,
			details: { reason: 'A user profile was deleted' },
		});
		await auditLog.save();

		// Clear the cache for the user data
		clearAllCache();

		res.status(StatusCodes.OK).json({
			message: 'User deleted successfully',
			userId: deletedUser._id,
		});
	} catch (error: any) {
		logger.error('Error deleting user:', error);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: error.message || 'An error occurred while deleting user',
		});
	}
};
