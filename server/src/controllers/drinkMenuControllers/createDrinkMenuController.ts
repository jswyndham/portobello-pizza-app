import { StatusCodes } from 'http-status-codes';
import { Response, Request } from 'express';
import { validationResult } from 'express-validator';
import AuditLog from '../../models/AuditLogModel';
import DrinkMenu from '../../models/DrinkMenuModel';
import { AuthenticatedRequest } from '../../types/request';
import { clearAllCache } from '../../cache/cache';
import hasPermission from '../../utils/hasPermission';
import logger from '../../logger';

export const createDrinkMenu = async (
	req: AuthenticatedRequest,
	res: Response
): Promise<void> => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
		return;
	}

	const { drinkCategory, name, imageUrl, ingredients, price, size } =
		req.body;

	const authReq = req as AuthenticatedRequest;

	if (!req.user) {
		res.status(StatusCodes.UNAUTHORIZED).json({
			message: 'User not authenticated',
		});
		return;
	}

	const { userId, userStatus } = req.user;
	if (!hasPermission(userStatus, 'CREATE_DRINK_ITEM')) {
		res.status(StatusCodes.FORBIDDEN).json({
			message: 'Forbidden: You do not have permission for this action',
		});
		return;
	}

	try {
		const drinkItem = await DrinkMenu.create({
			drinkCategory,
			name,
			imageUrl,
			ingredients,
			price,
			size,
		});

		const auditLog = new AuditLog({
			action: 'CREATE_DRINK_ITEM',
			subjectType: 'DrinkMenu',
			subjectId: drinkItem._id,
			userId: authReq.user!.userId,
			details: {
				reason: 'A new drink item was created',
				drinkItem: {
					drinkCategory,
					name,
					imageUrl,
					ingredients,
					price,
					size,
				},
			},
		});
		await auditLog.save();

		clearAllCache();

		res.status(StatusCodes.CREATED).json({
			msg: 'New drink item created',
			drinkItem,
		});
	} catch (error: any) {
		logger.error('Error creating drink item:', error);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message:
				error.message ||
				'An error occurred while creating a new drink menu item',
		});
	}
};
