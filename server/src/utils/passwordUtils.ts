import bcrypt from 'bcrypt';

// Hashes a password using bcrypt.
export async function hashPassword(password: string): Promise<string> {
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);
	return hashedPassword;
}

// Compares a password with a hashed password.
export async function comparePassword(
	password: string,
	hashedPassword: string
): Promise<boolean> {
	return bcrypt.compare(password, hashedPassword);
}
