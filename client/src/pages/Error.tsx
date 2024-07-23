import { Link, useRouteError } from 'react-router-dom';

const isRouteErrorResponse = (error: unknown): error is { status: number } => {
	return (
		typeof error === 'object' &&
		error !== null &&
		'status' in error &&
		typeof (error as any).status === 'number'
	);
};

const Error = () => {
	const error = useRouteError();

	if (isRouteErrorResponse(error) && error.status === 404) {
		return (
			<article className="relative overflow-hidden h-screen flex justify-center align-middle">
				<img
					src="/images/pasta.jpg"
					alt="Error page background"
					className="w-full h-auto lg:hidden"
				/>
				<img
					src="/images/italian-restaurant.jpg"
					alt="Error page background"
					className="hidden w-auto h-auto lg:flex"
				/>
				<div className="absolute inset-0 bg-black opacity-60 "></div>
				<div className="absolute inset-0  flex flex-col justify-center text-center items-center px-12">
					<img
						src="/images/portobello-logo-round-black.png"
						alt="Main Logo"
						className="absolute inset-0 mx-auto w-64 lg:w-96 mt-40"
					/>
					<div className="md:px-20 lg:pt-32 max-w-5xl">
						<h1 className="text-2xl md:text-4xl 2xl:text-5xl font-bold text-white pt-64 pb-6 lg:pt-28">
							Sorry! Page not found
						</h1>
						<h2 className="text-5xl lg:text-5xl font-cinzel font-bold text-red-600">
							404 error
						</h2>

						<p className="text-xl lg:text-2xl 2xl:text-3xl py-12  text-white">
							We cannot find the page you are looking for. Confirm
							that you have entered the correct URL address.
						</p>
					</div>
					<Link
						to="/"
						className="text-2xl 2xl:text-3xl font-semibold text-yellow-400 py-10 underline underline-offset-8 hover:cursor-pointer"
					>
						HOMEPAGE
					</Link>
				</div>
			</article>
		);
	}
	return (
		<article className="relative overflow-hidden h-screen flex justify-center align-middle">
			<img
				src="/images/pasta.jpg"
				alt="Error page background"
				className="w-full h-auto lg:hidden"
			/>
			<img
				src="/images/italian-restaurant.jpg"
				alt="Error page background"
				className="hidden w-auto h-auto lg:flex"
			/>
			<div className="absolute inset-0 bg-black opacity-60"></div>
			<div className="absolute inset-0  flex flex-col justify-center text-center items-center px-12">
				<img
					src="/images/portobello-logo-round-black.png"
					alt="Main Logo"
					className="absolute inset-0 mx-auto w-64 lg:w-96 mt-40"
				/>
				<div className="md:px-20 lg:pt-32 max-w-5xl">
					<h1 className="text-3xl 2xl:text-4xl font-bold text-red-500 pt-64 lg:py-16">
						Webpage error!
					</h1>
					<p className="text-xl lg:text-2xl 2xl:text-3xl py-2 text-white">
						I am afraid that this website has experienced an error.
					</p>

					<p className="text-xl lg:text-2xl 2xl:text-3xl text-white">
						We apologize for the inconvenience.
					</p>
				</div>
				<Link
					to="/"
					className="text-xl lg:text-2xl 2xl:text-3xl text-yellow-400 py-10 underline underline-offset-8 hover:cursor-pointer"
				>
					homepage
				</Link>
			</div>
		</article>
	);
};

export default Error;
