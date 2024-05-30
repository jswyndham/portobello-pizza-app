import { Request, Response } from 'express';
import { clearCache } from '../../cache/cache';
import AuditLog from '../../models/AuditLogModel';
import { StatusCodes } from 'http-status-codes';

// Define a type for the user object attached to the request
interface AuthenticatedRequest extends Request {
	user: {
		userId: string;
		_id: string;
	};
}

// Controller for logging out a user and removing the authentication cookie
export const logoutUser = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const user = (req as AuthenticatedRequest).user;
		const userId = user.userId;

		// Set the cookie to a dummy value and make it expire immediately
		res.cookie('token', '', {
			httpOnly: true,
			expires: new Date(Date.now()),
		});

		// Create an audit log entry of the user's action
		if (userId) {
			const auditLog = new AuditLog({
				action: 'LOGOUT',
				subjectType: 'Logout user',
				subjectId: userId,
				userId: userId,
				details: { reason: 'User logged out' },
			});
			await auditLog.save();
		}

		clearCache(`user_${userId}`);
		clearCache(`user_${user._id}`);
		clearCache(`quiz_${userId}`);
		clearCache(`class_${userId}`);
		clearCache(`membership_${userId}`);

		res.status(StatusCodes.OK).json({ msg: 'User logged out' });
	} catch (error: any) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message:
				error.message || 'An error occurred while logging out the user',
		});
	}
};
