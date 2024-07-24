import cron from 'node-cron';
import AuditLog from '../models/AuditLogModel';

const clearOldAuditLogs = async (): Promise<void> => {
	try {
		const threeMonthsAgo = new Date();
		threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

		await AuditLog.deleteMany({ createdAt: { $lt: threeMonthsAgo } });
	} catch (error) {
		console.error('Error clearing old audit logs:', error);
	}
};

// Schedule the job to run daily at midnight
cron.schedule('0 0 * * *', clearOldAuditLogs);

export default clearOldAuditLogs;
