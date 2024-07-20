import { Request, Response } from 'express';
import AuditLog from '../../models/AuditLogModel';
import { StatusCodes } from 'http-status-codes';

export const getAuditLogs = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const { userId } = req.params;

		const auditLogs = await AuditLog.find({ userId });

		console.log('userId: ', userId);
		console.log('auditLogs: ', auditLogs);

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
