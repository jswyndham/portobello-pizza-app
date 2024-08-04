import { FC } from 'react';
import {
	SubmitHandler,
	UseFormRegister,
	UseFormHandleSubmit,
} from 'react-hook-form';
import 'react-toastify/dist/ReactToastify.css';
import { LoginData } from '../../types/userInterfaces';

interface LoginFormProps {
	onSubmit: SubmitHandler<LoginData>;
	isSubmitting: boolean;
	register: UseFormRegister<LoginData>;
	handleSubmit: UseFormHandleSubmit<LoginData>;
}

const LoginForm: FC<LoginFormProps> = ({
	onSubmit,
	isSubmitting,
	register,
	handleSubmit,
}) => {
	return (
		<form onSubmit={handleSubmit(onSubmit)} className="w-full p-8 md:p-16">
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
					{...register('password', {
						required: true,
					})}
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
	);
};

export default LoginForm;
