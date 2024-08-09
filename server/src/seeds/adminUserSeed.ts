// seeds/adminUserSeed.js
import User from '../models/UserModel';
import { USER_STATUS } from '../constants';
import bcrypt from 'bcrypt';

export const seedAdminUser = async () => {
	const hashedPassword = await bcrypt.hash('AdminPassword123!', 10);
	const adminUser = new User({
		firstName: 'Admin',
		lastName: 'User',
		email: 'admin@example.com',
		password: hashedPassword,
		userStatus: USER_STATUS.ADMIN,
	});
	await adminUser.save();
};
