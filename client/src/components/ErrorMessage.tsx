import { FC } from 'react';

interface ErrorMessageProps {
	errorMessage: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ errorMessage }) => {
	return (
		<section className="w-screen h-screen bg-main-gradient-two">
			<article className="w-full h-full flex justify-center items-center">
				<div className="h-72 w-full md:lg:w-2xl max-w-2xl p-8 mx-3 flex flex-col justify-center items-center text-center border-2 border-red-400 bg-slate-200 font-semibold font-montserrat rounded-lg drop-shadow-lg shadow-lg shadow-slate-300">
					<div className="mb-8">
						<p className="text-primary font-cinzel text-3xl">
							ERROR!
						</p>
					</div>
					<div className="text-slate-600 text-xl lg:text-2xl px-4">
						{errorMessage}
					</div>
				</div>
			</article>
		</section>
	);
};

export default ErrorMessage;
