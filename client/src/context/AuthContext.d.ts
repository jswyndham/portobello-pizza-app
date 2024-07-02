import { ReactNode } from 'react';

// Define the shape of the state
interface AuthState {
	isLoggedIn: boolean;
}

// Define the context properties including state and dispatch
interface AuthContextProps {
	state: AuthState;
	dispatch: React.Dispatch<any>;
	logout: () => void;
}

export const AuthProvider: React.FC<{ children: ReactNode }>;
export const useAuth: () => AuthContextProps;
