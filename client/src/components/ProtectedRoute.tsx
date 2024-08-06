import { FC, ReactElement } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
	element: ReactElement;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ element }) => {
	const { state } = useAuth();
	const { isLoggedIn } = state;

	return isLoggedIn ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
