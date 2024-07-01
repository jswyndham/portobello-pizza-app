import { ReactNode } from 'react';

interface AuthContextProps {
	isLoggedIn: boolean;
	setIsLoggedIn: (status: boolean) => void;
	logout: () => void;
}

export const AuthProvider: React.FC<{ children: ReactNode }>;
export const useAuth: () => AuthContextProps;
