import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { RegisterData } from '../../types/userInterfaces';

interface RegisterFormProps {
	onSubmit: SubmitHandler<RegisterData>;
	isSubmitting: boolean;
}

const RegisterForm: FC<RegisterFormProps> = ({ onSubmit, isSubmitting }) => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<RegisterData>();

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="w-full p-8 md:p-16">
			{/* First Name */}
			<div className="flex flex-col mt-4">
				<label
					htmlFor="firstName"
					className="font-montserrat text-lg p-2 font-semibold"
				>
					first name
				</label>
				<input
					{...register('firstName', {
						required: 'A first name is required',
					})}
					type="text"
					name="firstName"
					placeholder="first name..."
					className="w-full p-2 rounded-md border border-slate-400"
				/>
				{errors.firstName && (
					<span className="text-red-600">
						{errors.firstName.message}
					</span>
				)}
			</div>

			{/* Last Name */}
			<div className="flex flex-col mt-4">
				<label
					htmlFor="lastName"
					className="font-montserrat text-lg p-2 font-semibold"
				>
					last name
				</label>
				<input
					{...register('lastName', {
						required: 'A last name is required',
					})}
					type="text"
					name="lastName"
					placeholder="last name..."
					className="w-full p-2 rounded-md border border-slate-400"
				/>
				{errors.lastName && (
					<span className="text-red-600">
						{errors.lastName.message}
					</span>
				)}
			</div>

			{/* EMAIL */}
			<div className="flex flex-col mt-4">
				<label
					htmlFor="email"
					className="font-montserrat text-lg p-2 font-semibold"
				>
					email
				</label>
				<input
					{...register('email', {
						required: 'An email is required',
						pattern: {
							value: /^\S+@\S+$/i,
							message:
								'The entered value does not match email format',
						},
					})}
					type="email"
					name="email"
					placeholder="email"
					className="w-full p-2 rounded-md border border-slate-400"
				/>
				{errors.email && (
					<span className="text-red-600">{errors.email.message}</span>
				)}
			</div>

			{/* PASSWORD */}
			<div className="flex flex-col mt-4">
				<div className="flex flex-col">
					<label
						htmlFor="password"
						className="font-montserrat text-lg px-1 pt-3 font-semibold"
					>
						password
					</label>
					<p className="text-red-500 pb-1">
						* include a capital letter, at least two numbers, and a
						symbol
					</p>
				</div>
				<input
					{...register('password', {
						required: 'A password is required',
						pattern: {
							value: /^(?=.*[A-Z])(?=.*\d{2,})(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
							message:
								'Password must include a capital letter, at leat two numbers, and a symbol.',
						},
					})}
					type="password"
					name="password"
					placeholder="password..."
					className="w-full p-2 rounded-md border border-slate-400"
				/>
				{errors.password && (
					<span className="text-red-600">
						{errors.password.message}
					</span>
				)}
			</div>

			{/* CONFIRM PASSWORD */}
			<div className="flex flex-col mt-4">
				<label
					htmlFor="confirmPassword"
					className="font-montserrat text-lg px-1 py-3 font-semibold"
				>
					confirm password
				</label>
				<input
					{...register('confirmPassword', {
						required: 'A password confirmation is required',
						validate: (value) =>
							value === watch('password') ||
							'Passwords do not match',
					})}
					type="password"
					name="confirmPassword"
					placeholder="confirm password..."
					className="w-full p-2 rounded-md border border-slate-400"
				/>
				{errors.confirmPassword && (
					<span className="text-red-600">
						{errors.confirmPassword.message}
					</span>
				)}
			</div>

			{/* BUTTON */}
			<div className="flex flex-col justify-center items-center py-4">
				<button
					type="submit"
					disabled={isSubmitting}
					className="h-8 w-full sm:w-10/12 mt-10 mb-4 bg-blue-500 text-white font-bold border-solid border-2 border-blue-500 rounded-lg drop-shadow-lg hover:bg-blue-600 hover:text-white hover:font-bold hover:shadow-lg hover:drop-shadow-md hover:shadow-slate-500 active:shadow-md active:bg-white active:text-blue-500 active:shadow-slate-500"
				>
					{isSubmitting ? 'submitting...' : 'Register'}
				</button>
			</div>
		</form>
	);
};

export default RegisterForm;
