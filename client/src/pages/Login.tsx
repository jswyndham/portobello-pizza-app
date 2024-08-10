import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginForm from '../components/user/LoginForm';
import { LoginData } from '../types/userInterfaces';
import { useState } from 'react';
import { ErrorMessage, Loading } from '../components';

const Login = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { isSubmitting },
	} = useForm<LoginData>();

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const navigate = useNavigate();
	const { dispatch } = useAuth();

	// Auth context & global state
	const { state } = useAuth();
	const { isLoggedIn } = state;

	const onSubmit: SubmitHandler<LoginData> = async (data) => {
		setIsLoading(true);
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/auth/login`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
					credentials: 'include',
				}
			);

			if (response.ok) {
				const { user, token } = await response.json(); // The token is returned with the user data

				// Store token in local storage
				localStorage.setItem('authToken', token);

				// Dispatch global login state, include token in payload
				dispatch({ type: 'LOGIN', payload: { token, user } });

				// Reset the form
				reset();

				// Navigate to home page
				navigate('/');
			} else {
				const errorData = await response.json();
				toast.error(`Failed to login user: ${errorData.message}`);
				setError(`Failed to login user: ${errorData.message}`);
			}
		} catch (error) {
			toast.error('An error occurred while trying to login.');
			setError(`Error submitting form`);
		} finally {
			setIsLoading(false);
		}
	};

	// Loading Screen
	if (isLoading || isSubmitting) {
		return <Loading />;
	}

	// Error screen
	if (error) {
		return <ErrorMessage errorMessage={error} />;
	}

	return (
		<>
			{isLoggedIn && (
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
			)}
			<section className="bg-[url('/images/pasta-fresh-2.jpg')] bg-cover align-middle w-screen min-h-screen">
				<article className="w-full h-screen backdrop-blur-md flex justify-center lg:items-center">
					<article className="mx-2 mt-28 md:mt-56 flex flex-col justify-start bg-login-gradient align-middle w-full sm:w-9/12 md:w-8/12 lg:w-1/2 max-w-lg h-fit rounded-xl py-8 mb-24 border border-slate-400 shadow-lg shadow-slate-800">
						<div className="mx-auto h-12 w-9/12 md:w-8/12 pt-6">
							<img
								src="/images/portobello-no-background-small-2.png"
								alt="Portobello logo"
							/>
						</div>
						<div className="flex justify-center items-center align-middle h-fit pt-8 lg:pt-24">
							<LoginForm
								onSubmit={onSubmit}
								isSubmitting={isSubmitting}
								register={register}
								handleSubmit={handleSubmit}
							/>
						</div>
					</article>
				</article>
			</section>
		</>
	);
};

export default Login;
