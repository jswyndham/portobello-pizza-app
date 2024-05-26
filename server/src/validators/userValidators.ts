import { query } from 'express-validator';

export const validateGetAllUsers = [
	query('page')
		.optional()
		.isInt({ min: 1 })
		.withMessage('Page must be a positive integer'),
	query('limit')
		.optional()
		.isInt({ min: 1 })
		.withMessage('Limit must be a positive integer'),
];
