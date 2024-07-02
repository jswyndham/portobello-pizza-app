import { Request, Response } from 'express';
import { clearCache } from '../../cache/cache';
import AuditLog from '../../models/AuditLogModel';
import { StatusCodes } from 'http-status-codes';
import { AuthenticatedRequest } from '../../types/request';

// Controller for logging out a user and removing the authentication cookie
export const logoutUser = async (
	req: AuthenticatedRequest,
	res: Response
): Promise<void> => {
	try {
		const user = req.user;
		const userId = user?.userId;

		if (!userId) {
			console.error('User ID missing');
			res.status(400).json({
				message: 'User ID missing',
			});
			return;
		}

		// Set the cookie to a dummy value and make it expire immediately
		res.cookie('token', '', {
			httpOnly: true,
			expires: new Date(Date.now()),
		});

		// Create an audit log entry of the user's action
		const auditLog = new AuditLog({
			action: 'LOGOUT',
			subjectType: 'Logout user',
			subjectId: userId,
			userId: userId,
			details: { reason: 'User logged out' },
		});
		await auditLog.save();

		clearCache(`user_${userId}`);
		clearCache(`quiz_${userId}`);
		clearCache(`class_${userId}`);
		clearCache(`membership_${userId}`);

		console.log('User logged out:', user);

		res.status(StatusCodes.OK).json({
			msg: 'User logged out',
			user: {
				id: userId,
			},
		});
	} catch (error: any) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message:
				error.message || 'An error occurred while logging out the user',
		});
	}
};
