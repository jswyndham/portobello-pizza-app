import { StatusCodes } from 'http-status-codes';
import { Response } from 'express';
import FoodMenu from '../../models/FoodMenuModel';
import AuditLog from '../../models/AuditLogModel';
import cloudinary from '../../config/cloudinary';
import { AuthenticatedRequest } from '../../types/request';

interface CloudinaryResult {
	secure_url: string;
}

export const createFoodMenu = async (
	req: AuthenticatedRequest,
	res: Response
): Promise<void> => {
	const { menuCategory, pizzaType, name, ingredients, price } = req.body;

	if (!menuCategory || !name || !Array.isArray(ingredients) || !price) {
		res.status(StatusCodes.BAD_REQUEST).json({
			message:
				'Invalid request body. Required fields: menuCategory, name, ingredients, price.',
		});
		return;
	}

	if (!req.user) {
		res.status(StatusCodes.UNAUTHORIZED).json({
			message: 'User not authenticated',
		});
		return;
	}

	try {
		let imageUrl = '';
		if (req.file) {
			const result = await new Promise<CloudinaryResult>(
				(resolve, reject) => {
					const stream = cloudinary.uploader.upload_stream(
						(error: unknown, result: any) => {
							if (error) {
								reject(error);
							} else {
								resolve(result as CloudinaryResult);
							}
						}
					);
					if (req.file) {
						stream.end(req.file.buffer);
					} else {
						reject(new Error('File buffer is missing'));
					}
				}
			);
			imageUrl = result.secure_url;
		}

		const foodItem = await FoodMenu.create({
			menuCategory,
			pizzaType,
			name,
			imageUrl,
			ingredients,
			price,
		});

		console.log('Menu created:', foodItem);

		const auditLog = new AuditLog({
			action: 'CREATE_FOOD_ITEM',
			subjectType: 'FoodMenu',
			subjectId: foodItem._id,
			userId: req.user.userId,
			details: { reason: 'New food item created' },
		});
		await auditLog.save();

		res.status(StatusCodes.CREATED).json({
			msg: 'New food item created',
			foodItem: {
				id: foodItem._id,
				menuCategory: foodItem.menuCategory,
				pizzaType: foodItem.pizzaType,
				name: foodItem.name,
				imageUrl: foodItem.imageUrl,
				ingredients: foodItem.ingredients,
				price: foodItem.price,
			},
		});
	} catch (error: any) {
		console.error('Error creating food item:', error);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message:
				error.message ||
				'An error occurred while creating a new food menu item',
		});
	}
};
