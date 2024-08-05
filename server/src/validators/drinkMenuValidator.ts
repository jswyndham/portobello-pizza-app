import { body } from 'express-validator';

export const validateDrinkMenu = [
	body('drinkCategory')
		.isString()
		.notEmpty()
		.withMessage('Drink category is required'),
	body('name')
		.isString()
		.notEmpty()
		.withMessage('A name for the drink item is required'),
	body('price')
		.isNumeric()
		.withMessage('Price for the drink item is required'),
];
