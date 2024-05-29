import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

if (!JWT_SECRET) {
	throw new Error('JWT_SECRET is not defined in environment variables');
}

interface UserPayload extends JwtPayload {
	userId: string;
	userStatus: string;
}

export const createJWT = (payload: UserPayload): string => {
	const token = jwt.sign(payload, JWT_SECRET, {
		expiresIn: JWT_EXPIRES_IN,
	});
	return token;
};

export const verifyJWT = (token: string): UserPayload => {
	const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
	if (typeof decoded !== 'object' || !decoded.userId || !decoded.userStatus) {
		throw new Error('Invalid token payload');
	}
	return decoded as UserPayload;
};
