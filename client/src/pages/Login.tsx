import { useNavigate } from 'react-router-dom';
import logo from '/images/portobello-no-background-small-2.png';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginData } from '../types/loginInterface';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		reset,
		formState: { isSubmitting },
	} = useForm<LoginData>();

	const onSubmit: SubmitHandler<LoginData> = async (data) => {
		try {
			const response = await fetch(
				'http://localhost:5001/api/v1/auth/login',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
					credentials: 'include', // Manages cookies for authentication
				}
			);

			if (response.ok) {
				const { user } = await response.json();
				console.log('User logged in:', user);
				toast.success(`Welcome to Porto Bello, ${user.firstName}!`);
				reset();
				navigate('/admin');
			} else {
				console.error('Failed to login user');
				toast.error(
					'Failed to login user. Please check your credentials and try again.'
				);
			}
		} catch (error) {
			console.error('Error submitting form:', error);
			toast.error('An error occurred while trying to login.');
		}
	};

	return (
		<section className="flex flex-row justify-center align-middle h-screen w-screen bg-gradient-to-b from-yellow-50 via-white to-primary pt-32 md:pt-48 px-2">
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
			<article className="flex flex-col justify-start bg-gradient-to-b from-primary via-white to-white align-middle w-full sm:w-9/12 md:w-8/12 lg:w-1/2 max-w-lg h-fit rounded-xl py-8 mb-24 border border-slate-400 shadow-lg shadow-slate-800">
				<div className="mx-auto h-12 w-10/12 md:w-8/12">
					<img src={logo} alt="Portobello logo" />
				</div>
				<div className="flex justify-center items-center align-middle h-fit pt-20 lg:pt-24">
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="w-full p-8 md:p-16"
					>
						{/* EMAIL */}
						<div className="flex flex-col mt-4">
							<label
								htmlFor="email"
								className="font-montserrat text-lg p-2 font-semibold"
							>
								email
							</label>
							<input
								{...register('email', { required: true })}
								type="email"
								name="email"
								placeholder="email"
								className="w-full p-2 rounded-md border border-slate-400"
							/>
						</div>

						{/* PASSWORD */}
						<div className="flex flex-col mt-4">
							<label
								htmlFor="password"
								className="font-montserrat text-lg px-1 py-3 font-semibold"
							>
								password
							</label>
							<input
								{...register('password', { required: true })}
								type="password"
								name="password"
								placeholder="password"
								className="w-full p-2 rounded-md border border-slate-400"
							/>
						</div>

						{/* BUTTON */}
						<div className="flex flex-col justify-center items-center py-4">
							<button
								type="submit"
								disabled={isSubmitting}
								className="h-8 w-full sm:w-10/12 mt-10 mb-4 bg-blue-500 text-white font-bold border-solid border-2 border-blue-500 rounded-lg drop-shadow-lg hover:bg-blue-600 hover:text-white hover:font-bold hover:shadow-lg hover:drop-shadow-md hover:shadow-slate-500 active:shadow-md active:bg-white active:text-blue-500 active:shadow-slate-500"
							>
								{isSubmitting ? 'submitting...' : 'login'}
							</button>
						</div>
					</form>
				</div>
			</article>
		</section>
	);
};

export default Login;
