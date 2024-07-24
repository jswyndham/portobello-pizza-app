import { StatusCodes } from 'http-status-codes';
import { Response } from 'express';
import FoodMenu from '../../models/FoodMenuModel';
import AuditLog from '../../models/AuditLogModel';
import { AuthenticatedRequest } from '../../types/request';
import { clearAllCache } from '../../cache/cache';
import { FoodMenu as FoodMenuInterface } from '../../models/FoodMenuModel'; // Import the FoodMenu interface

type FoodMenuKeys = keyof FoodMenuInterface;

export const editFoodMenu = async (
	req: AuthenticatedRequest,
	res: Response
): Promise<void> => {
	const { id } = req.params;
	const { menuCategory, pizzaType, name, ingredients, price, imageUrl } =
		req.body;

	if (!menuCategory || !name || !ingredients || !price) {
		res.status(StatusCodes.BAD_REQUEST).json({
			message:
				'Invalid request body. Required fields: menuCategory, name, ingredients, price.',
		});
		return;
	}

	const authReq = req as AuthenticatedRequest;

	if (!authReq.user) {
		res.status(StatusCodes.UNAUTHORIZED).json({
			message: 'User not authenticated',
		});
		return;
	}

	try {
		const foodItem = await FoodMenu.findById(id);

		if (!foodItem) {
			res.status(StatusCodes.NOT_FOUND).json({
				message: 'Food item not found',
			});
			return;
		}

		// Store old values for comparison
		const oldValues: Partial<FoodMenuInterface> = {
			menuCategory: foodItem.menuCategory,
			pizzaType: foodItem.pizzaType,
			name: foodItem.name,
			ingredients: foodItem.ingredients,
			price: foodItem.price,
			imageUrl: foodItem.imageUrl,
		};

		// Update the food item
		foodItem.menuCategory = menuCategory;
		foodItem.pizzaType = pizzaType;
		foodItem.name = name;
		foodItem.ingredients = Array.isArray(ingredients)
			? ingredients
			: JSON.parse(ingredients);
		foodItem.price = price;
		foodItem.imageUrl = imageUrl;

		await foodItem.save();

		// Create details object with changes
		const details: Record<string, any> = {
			reason: 'Food item was edited',
		};

		(Object.keys(oldValues) as FoodMenuKeys[]).forEach((key) => {
			if (oldValues[key] !== foodItem[key]) {
				details[key] = {
					old: oldValues[key],
					new: foodItem[key],
				};
			}
		});

		const auditLog = new AuditLog({
			action: 'EDIT_FOOD_ITEM',
			subjectType: 'FoodMenu',
			subjectId: foodItem._id,
			userId: authReq.user.userId,
			details,
		});
		await auditLog.save();

		// Clear all cache on item edit
		clearAllCache();

		res.status(StatusCodes.OK).json({
			msg: 'Food item edited',
			foodItem,
		});
	} catch (error) {
		console.error('Error editing food item:', error);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message:
				(error as Error).message ||
				'An error occurred while editing the food menu item',
		});
	}
};
