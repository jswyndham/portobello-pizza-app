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

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, initialState);

	useEffect(() => {
		checkAuthStatus(dispatch);
	}, [dispatch]);

	const logout = async () => {
		try {
			// Call logout on the server
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/auth/logout`,
				{
					method: 'POST',
					credentials: 'include',
				}
			);

			if (response.ok) {
				// Remove token from local storage after server logout
				localStorage.removeItem('authToken');
				dispatch({ type: 'LOGOUT' });
				toast.success('Successfully logged out');
			} else {
				const errorData = await response.json();
				toast.error(`Failed to logout: ${errorData.message}`);
			}
		} catch (error) {
			toast.error('Error logging out');
		} finally {
			// Remove the token even if the server call fails
			localStorage.removeItem('authToken');
			dispatch({ type: 'LOGOUT' });
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
