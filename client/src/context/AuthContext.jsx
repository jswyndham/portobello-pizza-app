import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = (props) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const checkAuthStatus = async () => {
			try {
				console.log('Checking authentication status...');
				const response = await fetch(
					'http://localhost:5001/api/v1/auth/status',
					{
						method: 'GET',
						credentials: 'include',
					}
				);

				if (response.ok) {
					const data = await response.json();
					console.log('Authentication status:', data);
					setIsLoggedIn(data.isLoggedIn);
				} else {
					setIsLoggedIn(true);
					console.log('Failed to fetch authentication status');
				}
			} catch (error) {
				console.error('Error checking authentication status:', error);
				setIsLoggedIn(true);
			}
		};

		checkAuthStatus();
	}, []);

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
				setIsLoggedIn(false);
			} else {
				console.error('Failed to logout');
			}
		} catch (error) {
			console.error('Error logging out:', error);
		}
	};

	return (
		<AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, logout }}>
			{props.children}
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
