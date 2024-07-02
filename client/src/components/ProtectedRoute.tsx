import { FC, ReactElement } from 'react';
import { useAuth } from '../context/AuthContext';
import Login from '../pages/Login';

interface ProtectedRouteProps {
	element: ReactElement;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ element }) => {
	const { state } = useAuth();
	const { isLoggedIn } = state;
	console.log('ProtectedRoute isLoggedIn:', isLoggedIn);
	return isLoggedIn ? element : <Login />;
};

export default ProtectedRoute;
