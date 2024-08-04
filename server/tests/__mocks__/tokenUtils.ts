import jwt, { JwtPayload } from 'jsonwebtoken';

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
		return {
			userId: decoded.userId,
			userStatus: decoded.userStatus,
		};
	} catch (err) {
		// Handle token verification errors if necessary
		return null;
	}
};
