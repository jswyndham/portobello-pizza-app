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
		const page = parseInt(req.query.page as string, 10) || 1;
		const limit = parseInt(req.query.limit as string, 10) || 20;
		const skip = (page - 1) * limit;

		if (!req.user) {
			res.status(StatusCodes.UNAUTHORIZED).json({
				message: 'User not authenticated',
			});
			return;
		}

		const { userStatus } = req.user;

		// Check for permissions
		if (!hasPermission(userStatus as USER_STATUS, 'GET_AUDITLOGS')) {
			res.status(StatusCodes.FORBIDDEN).json({
				message:
					'Forbidden: You do not have permission for this action',
			});
			return;
		}

		const auditLogs = await AuditLog.find({ userId })
			.sort({ createdAt: 1 })
			.skip(skip)
			.limit(limit);

		const totalLogs = await AuditLog.countDocuments({ userId });
		const totalPages = Math.ceil(totalLogs / limit);

		res.status(StatusCodes.OK).json({
			status: 'success',
			data: {
				auditLogs,
				page,
				totalPages,
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
