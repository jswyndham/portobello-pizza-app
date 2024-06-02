import { body } from 'express-validator';

export const validateFoodMenu = [
	body('menuCategory')
		.isString()
		.notEmpty()
		.withMessage('Menu category is required'),
	body('pizzaType').optional().isString(),
	body('name')
		.isString()
		.notEmpty()
		.withMessage('A name for the menu item is required'),
	body('ingredients')
		.isString()
		.notEmpty()
		.withMessage('Menu ingredients is required'),
	body('price')
		.isNumeric()
		.withMessage('Price for the menu item is required'),
	body('imageUrl').optional().isString(),
];
