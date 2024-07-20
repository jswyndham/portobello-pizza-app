import express from 'express';
import { getAuditLogs } from '../controllers/auditLogControllers/getAuditLogController';
import { authenticateUser } from '../middleware/authMiddleware';

const router = express.Router();

router
	.route('/:userId')
	.get(
		authenticateUser as express.RequestHandler,
		getAuditLogs as express.RequestHandler
	);

export default router;
