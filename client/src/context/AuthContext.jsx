import { createContext, useContext, useReducer, useEffect } from 'react';
import { checkAuthStatus } from './authCheck'; // Import the separate auth check function

const initialState = {
	isLoggedIn: false,
	token: null,
};

const authReducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			return { ...state, isLoggedIn: true, token: action.payload.token };
		case 'LOGOUT':
			return { ...state, isLoggedIn: false, token: null };
		case 'SET_AUTH':
			return {
				...state,
				isLoggedIn: action.payload.isLoggedIn,
				token: action.payload.token,
			};
		default:
			return state;
	}
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, initialState);

	useEffect(() => {
		checkAuthStatus(dispatch);
	}, [dispatch]);

	const logout = async () => {
		try {
			const response = await fetch(
				'http://localhost:5001/api/v1/auth/logout',
				{
					method: 'POST',
					credentials: 'include',
				}
			);

			if (response.ok) {
				dispatch({ type: 'LOGOUT' });
			} else {
				console.error('Failed to logout');
			}
		} catch (error) {
			console.error('Error logging out:', error);
		}
	};

	return (
		<AuthContext.Provider value={{ state, dispatch, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
