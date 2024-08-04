import { Response, Request } from 'express';
import { clearAllCache } from '../../cache/cache';
import AuditLog from '../../models/AuditLogModel';
import { StatusCodes } from 'http-status-codes';
import { verifyJWT } from '../../utils/tokenUtils';

// Controller for logging out a user and removing the authentication cookie
export const logoutUser = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		// Set the cookie to a dummy value and make it expire immediately
		res.cookie('token', '', {
			httpOnly: true,
			expires: new Date(0),
		});

		// Check if the user is authenticated to create an audit log entry
		const authHeader = req.headers.authorization;
		if (authHeader && authHeader.startsWith('Bearer ')) {
			const token = authHeader.split(' ')[1];
			if (token) {
				const payload = verifyJWT(token);
				if (payload) {
					const userId = payload.userId;

					// Create an audit log entry of the user's action
					const auditLog = new AuditLog({
						action: 'LOGOUT',
						subjectType: 'User Logout',
						subjectId: userId,
						userId: userId,
						details: { reason: 'User logged out' },
					});
					await auditLog.save();

					clearAllCache();
				}
			}
		}

		res.status(StatusCodes.OK).json({
			msg: 'User logged out',
		});
	} catch (error: any) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message:
				error.message || 'An error occurred while logging out the user',
		});
	}
};
