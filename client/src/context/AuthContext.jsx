import { createContext, useContext, useReducer, useEffect } from 'react';
import { checkAuthStatus } from './authCheck';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
	isLoggedIn: !!localStorage.getItem('authToken'),
	token: localStorage.getItem('authToken'),
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
		// Remove token from local storage immediately
		localStorage.removeItem('authToken');
		dispatch({ type: 'LOGOUT' });

		try {
			const response = await fetch(
				'http://localhost:5001/api/v1/auth/logout',
				{
					method: 'POST',
					credentials: 'include',
				}
			);

			if (response.ok) {
				toast.success('Successfully logged out');
			} else {
				const errorData = await response.json();
				toast.error(`Failed to logout: ${errorData.message}`);
			}
		} catch (error) {
			toast.error('Error logging out');
		}
	};

	return (
		<AuthContext.Provider value={{ state, dispatch, logout }}>
			{children}
			<ToastContainer
				position="top-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
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
