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
				// Remove token from local storage
				localStorage.removeItem('authToken');

				// Logout of AuthContext
				logout();

				// Dispatch the global 'logout' state
				dispatch({ type: 'LOGOUT' });

				// Toast modal
				toast.success('Logout successful');

				// Navigate to the home page upon logout
				navigate('/');
			} else {
				const errorData = await response.json();

				toast.error('Logout failed: ', errorData.message);
			}
		} catch (error) {
			toast.error('Logout failed: ');
		}
	};

	return (
		<div className="relative flex justify-end">
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
				className="toast-container absolute right-0 left-0 bottom-0"
				toastClassName="toast"
			/>
			<button
				type="button"
				onClick={handleLogout}
				className="w-24 h-9 m-2 bg-red-500 text-white font-semibold rounded-lg hover:text-yellow-100 drop-shadow-md hover:shadow-gray-600 hover:shadow-md hover:border-2 hover:border-white active:shadow-md active:bg-white active:text-blue-800 active:border-solid active:border-2 active:border-blue-800"
			>
				Logout
			</button>
		</div>
	);
};

export default LogoutButton;
