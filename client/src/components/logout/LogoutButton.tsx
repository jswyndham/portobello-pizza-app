import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LogoutButton: React.FC = () => {
	const navigate = useNavigate();
	const { logout, dispatch } = useAuth();

	const handleLogout = async () => {
		try {
			const response = await fetch(
				'http://localhost:5001/api/v1/auth/logout',
				{
					method: 'POST', // Ensure this is POST
					credentials: 'include', // Include cookies in the request
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			if (response.ok) {
				// Logout of AuthContext
				await logout();
				console.log(
					'user is logged out using the logout method: ',
					response
				);

				// Dispatch the global 'logout' state
				dispatch({ type: 'LOGOUT' });
				toast.success('Logout successful');
				// Navigate to the home page upon logout
				navigate('/');
				console.log('Logged out user: ', response);
			} else {
				const errorData = await response.json();
				console.error('Logout failed:', errorData.message);
				toast.error('Logout failed');
			}
		} catch (error) {
			console.error('An error occurred while logging out:', error);
			toast.error('Logout failed');
		}
	};

	return (
		<div className="flex justify-end">
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
				className="toast-container"
				toastClassName="toast"
			/>
			<button
				type="button"
				onClick={handleLogout}
				className="w-24 h-9 m-2 bg-red-500 text-white font-semibold rounded-lg hover:text-primary drop-shadow-md hover:shadow-gray-600 hover:shadow-md hover:border-2 hover:border-secondary active:shadow-md active:bg-white active:text-blue-800 active:border-solid active:border-2 active:border-blue-800"
			>
				Logout
			</button>
		</div>
	);
};

export default LogoutButton;
