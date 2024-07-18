import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FC } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RegisterData } from '../types/userInterfaces';
import RegisterForm from '../components/user/RegisterForm';

const Register: FC = () => {
	const {
		reset,
		formState: { isSubmitting },
		setError,
	} = useForm<RegisterData>();
	const navigate = useNavigate();
	const { dispatch } = useAuth();

	const onSubmit: SubmitHandler<RegisterData> = async (data) => {
		try {
			const response = await fetch(
				'http://localhost:5001/api/v1/auth/register',
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
				const { user, token } = await response.json(); // Assuming the token is returned with the user data
				console.log('User registered:', user);
				// Success modal
				toast.success(`You have successfully registered a new user!`);
				// Dispatch global login state
				dispatch({ type: 'LOGIN', payload: { token } }); // Include token in payload
				// Reset the form
				reset();
				// Navigate to home page
				navigate('/private/admin/members');
			} else {
				const result = await response.json();
				if (result.errors) {
					result.errors.forEach(
						(error: { param: string; msg: string }) => {
							setError(error.param as keyof RegisterData, {
								type: 'server',
								message: error.msg,
							});
						}
					);
				} else {
					console.error('Failed to register new user');
					toast.error(
						'Failed to register user. Please check your credentials and try again.'
					);
				}
			}
		} catch (error) {
			console.error('Error submitting form:', error);
			toast.error(
				'An error occurred while trying to register a new user'
			);
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
			<section className="bg-[url('/images/pizza-and-wine-2.jpg')] bg-cover align-middle h-screen w-screen px-2">
				<article className="w-full h-full backdrop-blur-md pt-48 flex justify-center lg:items-center">
					<article className="flex flex-col justify-start bg-register-gradient align-middle w-full sm:w-9/12 md:w-8/12 lg:w-1/2 max-w-lg h-fit rounded-xl py-8 mb-24 border border-slate-400 shadow-lg shadow-slate-800">
						<div className="mx-auto h-12 w-9/12 md:w-8/12 pt-6">
							<img
								src="/images/portobello-no-background-small-2.png"
								alt="Portobello logo"
							/>
						</div>
						<div className="flex justify-center items-center align-middle h-fit pt-20 lg:pt-24">
							<RegisterForm
								onSubmit={onSubmit}
								isSubmitting={isSubmitting}
							/>
						</div>
					</article>
				</article>
			</section>
		</>
	);
};

export default Register;
