// User Member info
export interface userData {
	_id: string;
	firstName: string;
	lastName: string;
	userStatus: string;
	lastLogin?: Date;
}

export interface useDataProps {
	firstName: string;
	lastName: string;
	userStatus: string;
	lastLogin: string;
}

// Login user
export interface LoginData {
	email: string;
	password: string;
}

// Register new member user
export interface RegisterData {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
}
