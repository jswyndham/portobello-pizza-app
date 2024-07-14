import { AuthAction } from '../types/authInterface';

export const checkAuthStatus = async (dispatch: React.Dispatch<AuthAction>) => {
	try {
		const response = await fetch(
			'http://localhost:5001/api/v1/auth/status',
			{
				method: 'GET',
				credentials: 'include',
			}
		);

		if (response.ok) {
			const data = await response.json();
			dispatch({
				type: 'SET_AUTH',
				payload: {
					isLoggedIn: data.isLoggedIn,
					token: data.token,
				},
			});
		} else {
			dispatch({ type: 'LOGOUT' });
		}
	} catch (error) {
		dispatch({ type: 'LOGOUT' });
	}
};
