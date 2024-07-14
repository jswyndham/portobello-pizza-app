import { FC } from 'react';

interface CardHeadingsProps {
	CardHeading: string;
	backImage: string;
	backImageAlt: string;
}

const CardHeadings: FC<CardHeadingsProps> = ({
	CardHeading,
	backImage,
	backImageAlt,
}) => {
	return (
		<div className="relative h-28 w-full flex justify-center py-8">
			<img
				src={backImage}
				alt={backImageAlt}
				className="h-28 w-11/12 md:w-9/12 lg:w-8/12 xl:max-w-2xl rounded-md drop-shadow-xl shadow-lg shadow-slate-500"
			/>
			<div className="absolute bg-slate-800 bg-opacity-50 w-11/12 md:w-9/12 lg:w-8/12 xl:max-w-2xl h-28 top-8 justify-center flex text-center items-center rounded-md">
				<h2 className="w-11/12 text-4xl lg:text-5xl font-cinzel font-light text-white border-y border-white py-3">
					{CardHeading}
				</h2>
			</div>
		</div>
	);
};

export default CardHeadings;
