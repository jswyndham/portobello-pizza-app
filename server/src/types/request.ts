import { Request } from 'express';
import { USER_STATUS } from '../constants/userStatus';

export interface AuthenticatedRequest extends Request {
	user?: {
		userId: string;
		userStatus: (typeof USER_STATUS)[keyof typeof USER_STATUS];
	};
	file?: Express.Multer.File;
}
