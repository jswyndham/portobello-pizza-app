import jwt, { JwtPayload } from 'jsonwebtoken';
import logger from '../../logger';

interface DecodedToken extends JwtPayload {
	userId: string;
	userStatus: string;
}

export const verifyJWT = (token: string): DecodedToken | null => {
	try {
		const decoded = jwt.verify(
			token,
			process.env.JWT_SECRET as string
		) as DecodedToken;

		if (
			typeof decoded !== 'object' ||
			!decoded.userId ||
			!decoded.userStatus
		) {
			return null;
		}

		return {
			userId: decoded.userId,
			userStatus: decoded.userStatus,
		};
	} catch (err) {
		logger.error('Error during token verification:', err); // Add logging for debugging
		return null;
	}
};
