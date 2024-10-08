import { body } from 'express-validator';

export const validateRegisterUser = [
	body('firstName')
		.isString()
		.notEmpty()
		.withMessage('First name is required'),
	body('lastName').isString().notEmpty().withMessage('Last name is required'),
	body('email').isEmail().withMessage('Valid email is required'),
	body('password')
		.isString()
		.isLength({ min: 6 })
		.withMessage('Password must be at least 6 characters long'),
	body('confirmPassword').custom((value, { req }) => {
		if (value !== req.body.password) {
			throw new Error('Password confirmation does not match password');
		}
		return true;
	}),
];

export const validateLoginUser = [
	body('email')
		.notEmpty()
		.withMessage('Email is required')
		.isEmail()
		.withMessage('Invalid email format'),
	body('password').notEmpty().withMessage('Password is required'),
];
