import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LogoutButton: React.FC = () => {
	const navigate = useNavigate();
	const { logout } = useAuth();

	const handleLogout = async () => {
		try {
			await logout();

			// Navigate to the home page upon logout
			navigate('/');
		} catch (error) {
			console.log('Error logging out');
		}
	};

	return (
		<>
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
			<div className="relative flex justify-end">
				<button
					type="button"
					onClick={handleLogout}
					className="w-24 h-9 m-2 bg-red-500 text-white font-semibold rounded-lg hover:text-yellow-100 drop-shadow-md hover:shadow-gray-600 hover:shadow-md hover:border-2 hover:border-white active:shadow-md active:bg-white active:text-blue-800 active:border-solid active:border-2 active:border-blue-800"
				>
					Logout
				</button>
			</div>
		</>
	);
};

export default LogoutButton;
