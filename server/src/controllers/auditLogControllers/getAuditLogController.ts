import { Response } from 'express';
import AuditLog from '../../models/AuditLogModel';
import { StatusCodes } from 'http-status-codes';
import hasPermission from '../../utils/hasPermission';
import { USER_STATUS } from '../../constants/userStatus';
import { AuthenticatedRequest } from '../../types/request';

export const getAuditLogs = async (
	req: AuthenticatedRequest,
	res: Response
): Promise<void> => {
	try {
		const { userId } = req.params;

		console.log('userId: ', userId); // Debug log to check userId

		if (!req.user) {
			res.status(StatusCodes.UNAUTHORIZED).json({
				message: 'User not authenticated',
			});
			return;
		}

		const { userStatus } = req.user;

		// Check user authorization
		if (!req.user) {
			res.status(StatusCodes.UNAUTHORIZED).json({
				message: 'User not authenticated',
			});
			return;
		}

		// Check for permissions
		if (!hasPermission(userStatus as USER_STATUS, 'GET_AUDITLOGS')) {
			res.status(StatusCodes.FORBIDDEN).json({
				message:
					'Forbidden: You do not have permission for this action',
			});
			return;
		}

		const auditLogs = await AuditLog.find({ userId }).sort({
			createdAt: 1,
		});

		console.log('auditLogs: ', auditLogs); // Debug log to check auditLogs

		res.status(StatusCodes.OK).json({
			status: 'success',
			data: {
				auditLogs,
			},
		});
	} catch (error: any) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message:
				error.message ||
				'An error occurred while fetching the audit logs',
		});
	}
};
